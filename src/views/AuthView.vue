<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Lado Esquerdo com Texto ou Logo -->
    <div class="flex-1 flex flex-col items-center justify-center text-white your_css_selector_here p-5">
      <div class="flex flex-col gap-10 justify-center items-center lg:flex-row">

        <div class="max-w-[400px] flex flex-col justify-center align-center">
          <h1 class="title text-center">Bem-vindo ao GabLivGifts 🎁</h1>
          <p class="sub">Aqui dividimos nossa lista de <span class="fra">presentes</span>, contem uma imensa lista de
            desesjos!</p>
        </div>


        <!-- Card Responsivo -->
        <div class="w-full max-w-sm shadow-lg rounded-lg p-6"
          style="background-color: var(--va-background-secondary);">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold">
              {{ activeTab === 'login' ? 'Login' : 'Cadastro' }}
            </h1>
            <p class="text-gray-600">
              {{ activeTab === 'login' ? 'Bem-vindo de volta 👋' : 'Crie sua conta e comece a adicionar seus presentes'
              }}
            </p>
          </div>

          <!-- Formulário de Login -->
          <VaForm ref="formRef" v-if="activeTab === 'login'" @submit.prevent="loginSub">
            <VaInput v-model="loginForm.email" label="Email" placeholder="Digite seu email" required class="w-full mb-4"
              :rules="[validateEmail]" />
            <VaInput v-model="loginForm.password" label="Senha" type="password" placeholder="Digite sua senha" required
              class="w-full mb-4" :rules="[(v) => (v && v.length > 0) || 'Senha inválida']" />
            <va-button class="w-full" size="large" type="submit" color="primary" :disabled="!isValid">
              Entrar
            </va-button>
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
    </div>
  </div>

</template>

<script setup lang="ts">

import { reactive, ref } from 'vue';
import { useForm } from 'vuestic-ui';

const { isValid, validate } = useForm('formRef')

const activeTab = ref('login');

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
</style>