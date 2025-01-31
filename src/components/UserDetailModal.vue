<template>
    <va-modal v-model="showModal" @ok="onConfirmed" @close="onCanceled" stateful close-button hideDefaultActions
        no-outside-dismiss fixed-layout :mobileFullscreen="false">

        <div class="space-y-10">
            <div>
                <h2 class="text-md font-semibold flex content-center">
                    <VaIcon class="mr-2" name="person" size="1.5rem" /> Meu Perfil
                </h2>

                <div class="my-3 col-span-3">
                    <VaDivider />
                </div>

                <div class="grid grid-cols-3 gap-4 md:grid-cols-3 xs:grid-cols-2">
                    <div>
                        <va-input v-model="item.codeUser" label="Cód. Perfil" inner-label :disabled="true"
                            class="w-full" />
                    </div>

                    <div class="col-span-2 xs:col-span-1 md:col-span-2">
                        <va-input v-model="item.fullName" label="Nome" class="w-full" inner-label :disabled="true" />
                    </div>
                </div>

            </div>


            <div v-if="item.couple">

                <h2 class="text-md font-semibold flex content-center">
                    <VaIcon class="mr-2" name="group" size="1.5rem" /> Perfil do Meu Casal
                </h2>

                <div class="my-3 md:my-3 xs:my-1 col-span-3">
                    <VaDivider />
                </div>

                <div class="grid grid-cols-3 gap-4 md:grid-cols-3 xs:grid-cols-2">
                    <div>
                        <va-input v-model="item.couple.user.codeUser" label="Cód. Perfil" inner-label :disabled="true"
                            class="w-full" />
                    </div>

                    <div class="col-span-2 xs:col-span-1 md:col-span-2">
                        <va-input v-model="item.couple.user.fullName" label="Nome" class="w-full" inner-label
                            :disabled="true" />
                    </div>
                </div>
            </div>

            <div v-else>
                <VaTabs v-model="valueTab" grow>
                    <template #tabs>
                        <VaTab v-for="tab in tabs" :key="tab.title" :name="tab.title">
                            <VaIcon :name="tab.icon" size="small" class="mr-2" />
                            {{ tab.title }}
                        </VaTab>
                    </template>

                    <div v-if="tabs[0].title === valueTab"
                        class="h-[350px] grid grid-cols-3 gap-4 md:grid-cols-3 sm:grid-cols-2 bg-[#1C1C1C] mt-3 p-3 rounded-md">

                        <div class="col-span-1">
                            <va-input :disabled="requestSend !== null" v-model="formVinc.codeUser" label="Cód. Perfil"
                                inner-label class="w-full" :rules="[codigoParRule]" placeholder="ex: #XX11A"
                                @keydown.enter="emitSearch">
                                <template #append>
                                    <va-button :loading="loading" class="px-1"
                                        :disabled="!isCodigoParValido || requestSend !== null" icon-right="search"
                                        icon-color="#f32c42" @click="emitSearch()">
                                    </va-button>
                                </template>
                            </va-input>
                        </div>

                        <div class="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2">
                            <va-input v-model="formVinc.fullName" label="Nome" class="w-full" inner-label readonly />
                        </div>

                        <div class="col-span-1 sm:col-span-3 md:col-span-2 md:col-end-4 lg:col-span-1 lg:col-end-4">
                            <VaButton class="w-full" size="large" :loading="loading"
                                :disabled="!formVinc.id || requestSend !== null" @click="confirmSolic">
                                Solicitar Vinculação
                            </VaButton>
                        </div>

                        <div class="bg-stone-900 p-2 rounded-md text-sm text-neutral-300 col-span-3">
                            <VaScrollContainer vertical class="max-h-40">
                                <p><strong>🔗 Instruções para Vinculação de Perfis:</strong></p>
                                <ul class="list-disc pl-4 space-y-1">
                                    <li><strong>Procurar seu par:</strong> Digite o código do perfil (exemplo: #XX11A) e
                                        clique
                                        em
                                        🔎(Pesquisar) para localizar o perfil.
                                    </li>
                                    <li><strong>Enviar solicitação:</strong> Após encontrar o perfil, clique em
                                        <em>Solicitar
                                            Vinculação</em>.
                                    </li>
                                    <li><strong>Aguardar aceitação:</strong> O perfil solicitado precisa aceitar a
                                        solicitação.
                                    </li>
                                    <li><strong>Vinculação:</strong> Após a aceitação, os perfis serão vinculados
                                        formando
                                        um
                                        casal.</li>
                                </ul>
                            </VaScrollContainer>

                        </div>
                    </div>

                    <div v-else style="width: 100%; flex-direction: row;"
                        class="h-[350px] bg-[#1C1C1C] mt-3 p-3 rounded-md">

                        <VaAlert border="left" border-color="secondary" v-model="isCloseableAlertVisible" closeable
                            class="mb-3" dense>
                            <span class="text-base lg:text-base md:text-sm sm:text-xs">Após ACEITAR uma solicitção será necessário realizar login novamente.</span>
                        </VaAlert>

                        <div v-if="requestReceived.length === 0" class="text-gray-500 w-full flex justify-center">
                            Nenhuma solicitação pendente.
                        </div>

                        <va-list v-else class="w-full">
                            <VaListLabel> Total de Solicitação: {{ requestReceived.length }} </VaListLabel>

                            <VaScrollContainer vertical style="max-height: 300px" class="p-2">
                                <va-list-item v-for="request in requestReceived" :key="request.id"
                                    class="my-3 w-full rounded-md flex justify-between items-center py-1 px-2 border-[#292929] border-2 hover:bg-[#3e3e3e]">

                                    <VaListItemSection>
                                        <VaListItemLabel>
                                            {{ request.sender.fullName }}
                                        </VaListItemLabel>

                                        <VaListItemLabel caption>
                                            {{ request.sender.codeUser }}
                                        </VaListItemLabel>
                                    </VaListItemSection>

                                    <VaListItemSection icon class="space-x-5">
                                        <VaButton round icon="thumb_up" class="hidden" />
                                        <VaButton round icon="thumb_up" color="secondary"
                                            @click="responseSolic('aceitar', request)" />
                                        <VaButton round icon="thumb_down" preset="secondary" border-color="primary"
                                            @click="responseSolic('recusar', request)" />
                                    </VaListItemSection>

                                </va-list-item>
                            </VaScrollContainer>
                        </va-list>
                    </div>
                </VaTabs>




            </div>



        </div>
    </va-modal>
</template>


<script>

const TABS = [
    { icon: "person_add", title: "Vincule seu amor" },
    { icon: "group_add", title: "Solicitações Recebidas" },
];

import { getUserByCode, responderVinculo, solicitarVinculo } from '@/services/giftService';

export default {
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        item: {
            type: Object,
            required: false,
        },
    },

    data() {
        return {
            showModal: this.isActive,
            formVinc: {
                id: null,
                codeUser: "",
                fullName: ""
            },
            loading: false,
            requestSend: null,
            tabs: TABS,
            valueTab: TABS[0].title,
            requestReceived: [],
            isCloseableAlertVisible: true,
        };
    },

    watch: {
        isActive(value) {
            this.showModal = value;
            if (this.showModal) {
                this.restoreRequestSend();
                this.restoreRequestReciver();
            }
        },
    },

    methods: {
        onConfirmed() {
            this.showModal = false;
            this.resetForm();
        },
        onCanceled() {
            this.$emit('canceled');
            this.showModal = false;
            this.resetForm();
        },

        restoreRequestReciver() {
            try {
                this.requestReceived = JSON.parse(localStorage.getItem("requestReceived"));

            } catch (error) {
                console.error("Erro ao carregar os adicionadores:", error);
            }
        },

        restoreRequestSend() {
            try {
                this.requestSend = JSON.parse(localStorage.getItem("requestSent"));

                if (this.requestSend) {

                    Object.assign(this.formVinc, {
                        id: this.requestSend.reciver.id,
                        fullName: this.requestSend.reciver.fullName,
                        codeUser: this.requestSend.reciver.codeUser
                    });
                }


            } catch (error) {
                console.error("Erro ao carregar os adicionadores:", error);
            }
        },

        resetForm() {
            this.formVinc = {
                id: null,
                fullName: '',
                codeUser: ''
            };
        },

        async confirmSolic() {
            const result = await this.$vaModal.confirm({ title: "Confirme o Envio", message: `Tem certeza de que deseja enviar esta solicitação para ${this.formVinc.fullName} ?`, okText: "Enviar", cancelText: "Cancelar", })
            if (result) {
                try {
                    this.loading = true;
                    await solicitarVinculo({ reciverId: this.formVinc.id });
                    this.$vaToast.init({ message: 'Solicitação enviada com sucesso!', color: 'success' });
                } catch (error) {
                    console.error(error)
                    this.$vaToast.init({ message: 'Erro ao enviar a solicitação.', color: 'danger' });
                } finally {
                    this.loading = false;
                }
            }
        },

        async responseSolic(statusResp, reciver) {
            const result = await this.$vaModal.confirm({ title: "Confirme sua resposta", message: `Tem certeza de que deseja ${statusResp} a solicitação de ${reciver.sender.fullName} ?`, okText: "Sim", cancelText: "Cancelar", })
            if (result) {
                try {
                    this.loading = true;
                    await responderVinculo({ status: statusResp === 'aceitar' ? 1 : 2 }, reciver.id);
                    this.$vaToast.init({ message: `Solicitação ${statusResp} com sucesso!`, color: 'success' });
                } catch (error) {
                    console.error(error)
                    this.$vaToast.init({ message: 'Erro ao responder a solicitação. Tente novamente mais tarde', color: 'danger' });
                } finally {
                    this.loading = false;
                }
            }
        },

        async emitSearch() {

            if (this.isCodigoParValido) {
                try {
                    this.loading = true;
                    const response = await getUserByCode(this.formVinc.codeUser);

                    if (response) {
                        console.log('Usuário encontrado:', response);

                        // Atualizar o estado do formulário com os dados recebidos
                        Object.assign(this.formVinc, {
                            id: response.id,
                            fullName: response.fullName,
                            codeUser: response.codeUser
                        });

                        this.$vaToast.init({ message: 'Par encontrado!', color: 'info' });
                    } else {
                        this.$vaToast.init({ message: 'Perfil não encontrado, verifique o código do seu parceiro(a).', color: 'info' });
                    }
                } catch (error) {
                    console.error(error);
                    this.$vaToast.init({ message: 'Erro ao buscar usuário. Tente novamente mais tarde.', color: 'danger' });
                } finally {
                    this.loading = false;
                }
            }
        },

        codigoParRule(value) {
            return /^#[A-Za-z0-9]{5}$/.test(value) || 'O código deve começar com "#" seguido de 5 caracteres alfanuméricos';
        },
    },

    computed: {
        isCodigoParValido() {
            return /^#[A-Za-z0-9]{5}$/.test(this.formVinc.codeUser);
        },
    }
}
</script>