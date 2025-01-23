<template>
    <va-modal v-model="showModal" @ok="onConfirmed" @close="onCanceled" stateful close-button hideDefaultActions
        fixed-layout class="w-full" :mobileFullscreen="false">

        <div class="p-2">
            <h2 class="text-xl font-semibold mb-4 flex content-center">
                <VaIcon class="mr-2" name="account_circle" size="1.5rem" /> Meu Perfil
            </h2>

            <div class="grid grid-cols-3 gap-4">
                <div>
                    <va-input v-model="item.codeUser" label="Codigo Perfil" inner-label :disabled="true" class="w-full" />
                </div>

                <div class="col-span-2">
                    <va-input v-model="item.fullName" label="Meu Nome" class="w-full" inner-label :disabled="true" />
                </div>
            </div>

            <div class="my-3 col-span-3">
                <VaDivider />
            </div>

            <div v-if="item.couple" class="grid grid-cols-3 gap-4">
                <div>
                    <va-input v-model="item.couple.id" label="Codigo Perfil" inner-label :disabled="true" class="w-full" />
                </div>

                <div class="col-span-2">
                    <va-input v-model="item.couple.fullName" label="Meu Nome" class="w-full" inner-label :disabled="true" />
                </div>
            </div>
        </div>
    </va-modal>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showModal: this.isActive,
        };
    },
    watch: {
        isActive(value) {
            this.showModal = value;
        },
    },
    methods: {
        onConfirmed() {
            this.showModal = false;
        },
        onCanceled() {
            this.$emit('canceled');
            this.showModal = false;
        },
    },
}
</script>