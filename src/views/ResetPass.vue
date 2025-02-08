<template>
    <div class="layout your_css_selector_here ">
        <div class="p-4 w-full flex flex-col items-center" style="margin-top: 10%;">

            <div class="flex-1 flex flex-col items-center justify-center text-white p-2 max-w-[800px] w-full">
                <div class="flex flex-col gap-10 justify-center items-center lg:flex-row w-full">


                    <div class="flex flex-col justify-center align-center w-full max-w-[400px]">
                        <h1 class="title text-center">Bem-vindo ao GabLivGifts 🎁</h1>
                        <p class="sub">Aqui dividimos nossa lista de <span class="fra">presentes</span>, que contém uma
                            imensa lista
                            de desejos!</p>
                    </div>

                    <div class="w-full max-w-[400px] shadow-lg rounded-lg px-4 py-6"
                        style="background-color: var(--va-background-secondary);">


                        <div class="text-center mb-6">
                            <h1 class="text-2xl font-bold">Redefinição de Senha</h1>
                        </div>


                        <VaForm ref="formRef" @submit.prevent="resetPassword" class="flex flex-col gap-6">

                            <!-- Campo de Nova Senha -->
                            <VaInput v-model="newPassword" label="Nova Senha" type="password"
                                placeholder="Digite sua nova senha" required class="w-full"
                                :rules="[(v) => (v && v.length >= 8) || 'A senha deve ter pelo menos 8 caracteres']" />

                            <!-- Confirmação da Nova Senha -->
                            <VaInput v-model="confirmPassword" label="Confirmar Senha" type="password"
                                placeholder="Confirme sua nova senha" required class="w-full"
                                :rules="[(v) => (v === newPassword) || 'As senhas não correspondem']" />

                            <!-- Botão de Enviar -->
                            <VaButton class="w-full mb-3" size="large" type="submit" color="primary"
                                :disabled="!isValid || loading" :loading="loading">
                                Redefinir Senha
                            </VaButton>

                            <!-- Mensagem de Sucesso -->
                            <VaAlert v-if="showAlert" class="mb-3" color="#0f5132">
                                Senha redefinida com sucesso! Você pode fazer login agora.
                            </VaAlert>

                            <!-- Botão de Voltar para Login -->
                            <VaButton color="secondary" class="justify-self-center" preset="plain" size="small" to=""
                                @click="this.$router.push('/login');">
                                Voltar para Login
                            </VaButton>
                        </VaForm>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { resetPass } from '@/services/authService';

export default {
    data() {
        return {
            token: this.$route.query.token, // Obtém o token da URL
            newPassword: '',
            confirmPassword: '',
            loading: false,
            showAlert: false,
            isValid: false,
        };
    },
    methods: {
        async resetPassword() {
            try {
                this.loading = true;

                // Envia o token e a nova senha para o backend
                const response = await resetPass({
                    token: this.token,
                    newPassword: this.newPassword,
                });
                if (response) {
                    this.showAlert = true;
                    this.newPassword = '';
                    this.confirmPassword = '';
                } else {
                    this.$vaToast.init({ message: 'Erro ao redefinir a senha. Tente novamente.', color: 'error' });

                }

                // Exibe a mensagem de sucesso

            } catch (error) {
                this.$vaToast.init({ message: 'Erro ao redefinir a senha. Tente novamente.', color: 'error' });
            } finally {
                this.loading = false;
            }
        },
    },
    watch: {
        newPassword() {
            this.isValid = this.newPassword && this.newPassword.length >= 8 && this.newPassword === this.confirmPassword;
        },
        confirmPassword() {
            this.isValid = this.newPassword && this.newPassword.length >= 8 && this.newPassword === this.confirmPassword;
        },
    },

    mounted() {
        // Verifica se o token está presente na query string
        const token = this.$route.query.token;

        // Se não houver token, redireciona para a página de login
        if (!token) {
            this.$router.push('/login');
        }
    },
};
</script>

<style scoped>
.reset-password-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
}

.reset-password-container .v-alert {
    margin-bottom: 16px;
}

.layout {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    align-items: center;
    display: flex;
    flex-direction: column;
}
</style>