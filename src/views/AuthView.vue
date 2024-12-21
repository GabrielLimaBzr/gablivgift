<template>

  <div class="layout your_css_selector_here ">
    <div class="p-4 w-full flex flex-col items-center" style="margin-top: 10%;">

      <div class="flex-1 flex flex-col items-center justify-center text-white p-2 max-w-[800px] w-full">
        <div class="flex flex-col gap-10 justify-center items-center lg:flex-row w-full">

          <div class="flex flex-col justify-center align-center w-full max-w-[400px]">
            <h1 class="title text-center">Bem-vindo ao GabLivGifts 🎁</h1>
            <p class="sub">Aqui dividimos nossa lista de <span class="fra">presentes</span>, contem uma imensa lista de
              desesjos!</p>
          </div>


          <!-- Card Responsivo -->
          <div class="w-full max-w-[400px] shadow-lg rounded-lg px-4 py-6"
            style="background-color: var(--va-background-secondary);">
            <div class="text-center mb-6">
              <h1 class="text-2xl font-bold">
                {{ activeTab === 'login' ? 'Login' : 'Cadastro' }}
              </h1>
              <p class="text-[#575757]">
                {{ activeTab === 'login' ? loginText : registerText
                }}
              </p>
            </div>

            <!-- Formulário de Login -->
            <VaForm ref="formRef" v-if="activeTab === 'login'" @submit.prevent="loginSub"
              class="flex flex-col gap-6">

              <VaInput v-model="loginForm.email" label="Email" placeholder="Digite seu email" required
                class="col-span-1" :rules="[validateEmail]" />

              <VaInput v-model="loginForm.password" label="Senha" type="password" placeholder="Digite sua senha"
                required class="w-full" :rules="[(v) => (v && v.length > 0) || 'Senha inválida']" />

              <div>
                <va-button class="w-full mb-3" size="large" type="submit" color="primary" :disabled="!isValid">
                  Entrar
                </va-button>

                <VaButton class="justify-self-start font-normal" preset="plainOpacity" size="small" color="#575757">
                  Esqueceu a senha?
                </VaButton>
              </div>

              <div></div>

              <VaButton class="justify-self-center" preset="plainOpacity" size="small" @click="activeTab = 'register'">
                Ainda não tem uma conta? Registrar
              </VaButton>
            </VaForm>

            <!-- Formulário de Cadastro -->
            <form v-if="activeTab === 'register'" @submit.prevent="registerSub">
              <input v-model="registerForm.name" type="text" placeholder="Digite seu nome"
                class="w-full px-4 py-2 border rounded-md mb-4" />
              <input v-model="registerForm.email" type="email" placeholder="Digite seu e-mail"
                class="w-full px-4 py-2 border rounded-md mb-4" />
              <input v-model="registerForm.password" type="password" placeholder="Crie uma senha"
                class="w-full px-4 py-2 border rounded-md mb-4" />
              <va-button class="w-full" size="large" type="submit" color="primary">
                Cadastrar
              </va-button>
            </form>
          </div>
        </div>

        <Footer class="mt-[200px]"></Footer>
      </div>
    </div>
  </div>






</template>

<script setup lang="ts">
import Footer from '@/components/Footer.vue';

import { reactive, ref } from 'vue';
import { useForm } from 'vuestic-ui';

const { isValid, validate } = useForm('formRef')

const activeTab = ref('login');

const loginText = ref('Bem-vindo de volta 👋');
const registerText = ref('Crie sua conta e comece a adicionar seus presentes');

const loginForm = reactive({
  email: '',
  password: '',
});

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
});

const loginSub = () => alert('Form Login submitted!')
const registerSub = () => alert('Form Register submitted!')

function validateEmail(valor: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar email
  return emailPattern.test(valor) || 'Por favor, insira um email válido.';
}
</script>

<style>
/* Personalize ainda mais se necessário */

.your_css_selector_here {
  background-color: hsla(277.5, 20%, 7%, 1);
  background-image: radial-gradient(circle at 83% 8%, hsla(344.8387096774194, 76%, 52%, 0.35) 13.2209727561817%, transparent 57.79527252984263%), radial-gradient(circle at 83% 77%, hsla(277.50000000000006, 18%, 7%, 0) 13.2209727561817%, transparent 57.79527252984263%), radial-gradient(circle at 16% 80%, hsla(221.5853522805607, 71%, 60%, 0.35) 10.524512369218554%, transparent 41.41081577193815%);
  background-blend-mode: normal, normal, normal;
}

.title {
  color: rgba(228, 228, 228, 0.77);
  font-size: 1.5rem;
  line-height: 2.25rem;
  font-weight: 800;
}

.sub {
  color: rgba(255, 255, 255, 0.59);
  text-align: center;
}

.fra {
  color: aliceblue;
  line-height: 2.25rem;
  padding: 3px;
  border-bottom: solid 1px var(--va-primary);
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