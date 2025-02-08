<template>

  <div class="layout your_css_selector_here ">
    <div class="p-4 w-full flex flex-col items-center" style="margin-top: 10%;">

      <div class="flex-1 flex flex-col items-center justify-center text-white p-2 max-w-[800px] w-full">
        <div class="flex flex-col gap-10 justify-center items-center lg:flex-row w-full">

          <div class="flex flex-col justify-center align-center w-full max-w-[400px]">
            <h1 class="title text-center">Bem-vindo ao GabLivGifts 🎁</h1>
            <p class="sub">Aqui dividimos nossa lista de <span class="fra">presentes</span>, que contém uma imensa lista
              de desejos!</p>
          </div>


          <!-- Card Responsivo -->
          <div class="w-full max-w-[400px] shadow-lg rounded-lg px-4 py-6"
            style="background-color: var(--va-background-secondary);">
            <div class="text-center mb-6">
              <h1 class="text-2xl font-bold">{{ tabTitle }}</h1>
              <p class="text-[#7e7e7e]">
                <span v-if="activeTab === 'recover'">
                  Insira seu e-mail para redefinir sua senha. <br />
                  Se o e-mail estiver registrado, você receberá instruções em sua caixa de entrada.
                </span>
                <span v-else>{{ tabDescription }}</span>
              </p>
            </div>

            <!-- Formulário de Login -->
            <VaForm ref="formRef" v-if="activeTab === 'login'" @submit.prevent="loginSub" class="flex flex-col gap-6">

              <VaInput v-model="loginForm.email" label="Email" placeholder="Digite seu email" required
                class="col-span-1" :rules="[validateEmail]" />

              <VaInput v-model="loginForm.password" label="Senha" type="password" placeholder="Digite sua senha"
                required class="w-full" :rules="[(v) => (v && v.length > 0) || 'Senha inválida']" />

              <div>
                <va-button class="w-full mb-3" size="large" type="submit" color="primary" :disabled="!isValid"
                  :loading="loading">
                  Entrar
                </va-button>

                <VaButton class="justify-self-start font-normal" preset="plainOpacity" size="small" color="#7e7e7e"
                  @click="navigateTo('recover')">
                  Esqueceu a senha?
                </VaButton>
              </div>

              <div></div>

              <VaButton color="secondary" class="justify-self-center" preset="plain" size="small"
                @click="navigateTo('register')">
                Ainda não tem uma conta? Registrar
              </VaButton>
            </VaForm>

            <!-- Formulário de Registro -->
            <VaForm ref="formRef" v-else-if="activeTab === 'register' && !emailConfirmationMessage"
              @submit.prevent="registerSub" class="flex flex-col gap-6">

              <VaInput v-model="registerForm.fullName" label="Nome" placeholder="Digite seu nome" required
                class="w-full" :rules="[(v) => (v && v.length > 0) || 'Nome é obrigatório']" />

              <VaInput v-model="registerForm.email" label="Email" placeholder="Digite seu email" required class="w-full"
                :rules="[validateEmail]" />

              <VaInput v-model="registerForm.password" label="Senha" type="password" placeholder="Crie uma senha"
                required class="w-full"
                :rules="[(v) => (v && v.length >= 8) || 'A senha deve ter no mínimo 8 caracteres']" />

              <div>
                <VaButton class="w-full mb-3" size="large" type="submit" color="primary" :disabled="!isValid"
                  :loading="loading">
                  Cadastrar
                </VaButton>
              </div>

              <VaButton color="secondary" class="justify-self-center" preset="plain" size="small"
                @click="navigateTo('login')">
                Já possui uma conta? Login
              </VaButton>

            </VaForm>


            <VaForm ref="formRef" v-else @submit.prevent="resetPasswordSub" class="flex flex-col gap-6">
              <VaInput v-model="resetForm.email" label="E-mail" placeholder="Digite seu e-mail" required
                class="col-span-1" :rules="[validateEmail]" />

              <VaButton class="w-full mb-3" size="large" type="submit" color="primary" :disabled="!isValid || loading"
                :loading="loading">
                Enviar Link de Redefinição
              </VaButton>

              <VaAlert v-if="showAlert" class="mb-" color="#0f5132">
                Um e-mail de recuperação de senha foi enviado, verifique sua caixa de entrada.
              </VaAlert>

              <VaButton color="secondary" class="justify-self-center" preset="plain" size="small"
                @click="navigateTo('login')">
                Voltar para Login
              </VaButton>


            </VaForm>

            <VaAlert v-model="emailConfirmationMessage" class="mb-6" color="#0f5132">
              Um e-mail de confirmação foi enviado para <strong>{{ registerForm.email }}</strong> Verifique sua caixa
              de
              entrada.
            </VaAlert>

          </div>
        </div>

        <Footer class="mt-[200px]"></Footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import { loginUser, registerUser, recoverPassword } from '@/services/authService';
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vuestic-ui';
const route = useRoute();
const router = useRouter();
const { isValid } = useForm('formRef')

const showAlert = ref(false);

const emailConfirmationMessage = ref(false);
const activeTab = ref(
  route.path.includes('register') ? 'register' :
    route.path.includes('recover') ? 'recover' : 'login'
);



const resetForm = reactive({
  email: '',
});
const loginForm = reactive({
  email: '',
  password: '',
});

const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
});

const navigateTo = (tab) => {
  activeTab.value = tab;
  router.push(`/auth/${tab}`);
};

import { useToast } from 'vuestic-ui';
const { init, notify, close, closeAll } = useToast();


const loading = ref(false);

async function loginSub() {
  loading.value = true;
  try {
    const response = await loginUser(loginForm);

    if (!response) {
      init({ message: 'Não foi possível realizar o login' });
      return;
    }

    // Login bem-sucedido
    init({ message: 'Login Realizado com Sucesso!', color: 'success' });
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('requestSent', JSON.stringify(response.requestSent));

    router.push({ name: 'gift' });
  } catch (error) {
    // Mostra mensagem de erro para o usuário
    init({ message: error.message, color: 'error' });
    console.error('Erro no login:', error);
  } finally {
    loading.value = false;
  }
}


async function registerSub() {
  loading.value = true;
  try {
    const response = await registerUser(registerForm);
    console.log('response', response);

    if (!response) {
      throw new Error('Falha no login. Verifique suas credenciais.');
    }
    console.log('response', response);

    emailConfirmationMessage.value = true;

  } catch (error) {
    console.error('Erro no register:', error);
  } finally {
    loading.value = false;
  }
}

async function resetPasswordSub() {
  try {
    loading.value = true;
    const response = await recoverPassword(resetForm);
    resetForm.email = ''; // Limpar o campo após sucesso
    showAlert.value = true;

    // Ocultar alerta após 5 segundos
    setTimeout(() => {
      showAlert.value = false;
    }, 10000);
  } catch (error) {
    showAlert.value = true;

    // Ocultar alerta após 5 segundos
    setTimeout(() => {
      showAlert.value = false;
    }, 10000);
  } finally {
    loading.value = false;
  }
}


function validateEmail(valor: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar email
  return emailPattern.test(valor) || 'Por favor, insira um email válido.';
}


const tabTitle = computed(() => {
  switch (activeTab.value) {
    case 'login':
      return 'Acessar Conta';
    case 'register':
      return 'Criar Conta';
    case 'recover':
      return 'Recuperar Senha';
    default:
      return '';
  }
});

const tabDescription = computed(() => {
  switch (activeTab.value) {
    case 'login':
      return 'Bem-vindo de volta 👋';
    case 'register':
      return 'Crie sua conta e comece a adicionar seus presentes';
    default:
      return '';
  }
});
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>