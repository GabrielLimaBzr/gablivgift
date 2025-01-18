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
            <div class="text-center">
              <h1 class="text-2xl font-bold">
                Cadastro
              </h1>
              <p class="text-[#575757]">
                Confirmação de cadastro
              </p>

              <VaDivider color="#575757"></VaDivider>

              <p v-if="!isConfirmed && !error">
                <VaIcon class="mr-2" name="loop" spin="counter-clockwise" />Validando o seu e-mail...
              </p>
              

              <p v-if="isConfirmed">✅ E-mail confirmado com sucesso!</p>
              <p v-if="isConfirmed">Realize Login na sua conta e comece a adicionar presentes!</p>
              <VaButton v-if="isConfirmed" class="justify-self-center w-full mt-4" :to="{ name: 'auth' }">
                Login
              </VaButton>
              
              <p v-if="error">⚠️ Falha ao validar Token: <br />{{ error }}</p>
            </div>
          </div>
        </div>


        <Footer class="mt-[200px]"></Footer>
      </div>
    </div>
  </div>


</template>

<script lang="ts">
import Footer from '@/components/Footer.vue';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    Footer,
  },
  setup() {
    const route = useRoute();
    const isConfirmed = ref(false);
    const error = ref('');

    const validateEmailToken = async (token) => {
      try {
        // Exemplo de chamada à API para validar o token
        const response = await fetch(`https://gablivgift-ws.onrender.com/gabliv/api/v1/auth/verify-email?token=${token}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Token inválido ou expirado.');
        }

        isConfirmed.value = true;
      } catch (err) {
        error.value = err.message;
      }
    };

    onMounted(() => {
      const token = route.query.token; // Obtém o token da URL
      if (token) {
        validateEmailToken(token);
      } else {
        error.value = 'Token não fornecido.';
      }
    });

    return {
      isConfirmed,
      error,
    };
  },
};

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