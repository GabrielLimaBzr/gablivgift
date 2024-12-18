<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Lado Esquerdo com Texto ou Logo -->
    <div class="flex-1 flex flex-col items-center justify-center text-white your_css_selector_here">
      <h1 class="text-4xl font-bold">Bem-vindo ao GabLivGifts 🎁</h1>
      <p class="sub">Aqui dividimos nossa lista de <span class="fra">presentes</span>, contem uma imensa lista de
        desesjos!</p>

      <div class="w-1/3 shadow-lg px-5 py-8 flex flex-col justify-center mt-4 rounded-md"
        style="background-color: var(--va-background-secondary);">
        <div class="mb-6 text-center">
          <h1 class="text-2xl font-bold"> {{ activeTab === 'login' ? 'Login' : 'Cadastro' }}</h1>
          <h2 class="font-100">
            {{ activeTab === 'login' ? 'Bem vindo de volta 👋' : 'Crie sua conta e comece adicionar seus presentes' }}
          </h2>
        </div>

        <!-- Formulário de Login -->
        <VaForm ref="formRef" v-if="activeTab === 'login'" @submit.prevent="loginSub">
          <VaInput v-model="loginForm.email" label="Email" placeholder="Coloque seu email" required class="w-full"
            :rules="[validateEmail]">
            <template #prependInner>
              <VaIcon name="mail" color="secondary" />
            </template>
          </VaInput>

          <VaSpacer class="my-5"> </VaSpacer>

          <VaInput v-model="loginForm.password" label="Senha" type="password" placeholder="Senha" required
            class="w-full" :rules="[(v) => (v && v.length > 0) || `Senha Inválida`]">
            <template #prependInner>
              <VaIcon name="lock" color="secondary" />
            </template>
          </VaInput>

          <VaSpacer class="my-5"> </VaSpacer>

          <va-button class="w-full mt-2" size="large" type="submit" color="primary" :disabled="!isValid"
            @click="validate() && loginSub()">
            Entrar
          </va-button>
        </VaForm>

        <!-- Formulário de Cadastro -->
        <form v-if="activeTab === 'register'" @submit.prevent="registerSub">
          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Nome</label>
            <input v-model="registerForm.name" type="text" placeholder="Digite seu nome"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-600 mb-1">E-mail</label>
            <input v-model="registerForm.email" type="email" placeholder="Digite seu e-mail"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>

          <div class="mb-4">
            <label class="block text-gray-600 mb-1">Senha</label>
            <input v-model="registerForm.password" type="password" placeholder="Crie uma senha"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
          </div>

          <va-button class="w-full" size="large" type="submit" color="primary">
            Cadastrar
          </va-button>
        </form>
      </div>
    </div>

    <!-- Lado Direito com Formulário -->

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
  font-size: 1.875rem;
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