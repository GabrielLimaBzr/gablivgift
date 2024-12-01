<template>
  <div class="flex flex-col justify-center w-full items-center py-10">
    <h1 class="title">GabLivGifts</h1>
    <p class="sub">Aqui dividimos nossa lista de <span class="fra">presentes</span>, contem uma imensa lista de
      desesjos!</p>

    <div class="p-2 m-5 grid grid-cols-3 gap-3 justify-stretch">
      <VaSelect v-model="value" :options="options" label="Ordernar por:" class="col-span-1 w-[150px]" color="primary">
        <template #content="{ value }">
          <span class="textOption">
            {{ value }}
          </span>
        </template>
      </VaSelect>

      <VaSelect v-model="valueP" :options="adcionadorPor" label="Adicionado por:" class="col-span-1 w-[150px]"
        color="primary">
        <template #content="{ value }">
          <span class="textOption">
            {{ value }}
          </span>
        </template>
      </VaSelect>

      <VaSelect v-model="valueZ" :options="precoAte" label="Preço:" class="col-span-1 w-[150px]" color="primary">
        <template #content="{ value }">
          <span class="textOption">
            {{ value }}
          </span>
        </template>
      </VaSelect>
    </div>

    <div class="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 p-2 md:px-1 sm:px-6">
      <div v-for="(item, index) in savedItems" :key="index">
        <Card :item="item" />
      </div>
      <div v-for="(item, index) in 9" :key="index">
        <Card/>
      </div>
    </div>
    <button class="add-button" @click="openModal">
      <img class="w-full rounded img" src="../assets/logo.svg" alt="LoG">
      <span> + Presente</span>
    </button>
    <FormPresenteModal :is-active="showModal" @canceled="closeModal" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import FormPresenteModal from '@/components/FormPresenteModal.vue';

export default {
  components: { Card, FormPresenteModal },
  name: "Chips",
  data() {
    return {
      adcionadorPor: [
        "Todos",
        "Livia",
        "Gabriel"
      ],
      options: [
        "Data",
        "Categoria"
      ],
      precoAte: [
        "Tudo",
        "Até 25",
        "Até 50",
        "Até 100",
        "Apartir de 200"
      ],
      valueZ: "Tudo",
      value: "Data",
      valueP: "Todos",
      showModal: false,
      savedItems: [],
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },
  },

  mounted() {
    // Restaurar a lista de itens salvos do localStorage, se existirem
    const cachedList = localStorage.getItem('formItems');
    if (cachedList) {
      this.savedItems = JSON.parse(cachedList);
    }
  },
}

</script>
<style scoped>
.img{
  width: 30px !important;
}

.fixed-size {
  width: 100%;
  /* Garante que cada select ocupe o mesmo espaço dentro de sua coluna */
  max-width: 300px;
  /* Ajuste conforme necessário para o tamanho desejado */
  display: flex;
  flex-direction: column;
}

.textOption {
  color: var(--va-text-inverted) !important;
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

.add-button {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
  background: hsla(0, 0%, 80%, 0.563);
  backdrop-filter: blur(6px);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: lighter;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-button:hover {
  background: hsla(0, 0%, 0%, 0.342);
  transform: translateX(-50%) scale(1.1);
}

.add-button:active {
  background-color: #c1c1c1a4;
  /* Cor ao clicar */
}

/* Media Queries para responsividade */
@media (max-width: 768px) {

  /* Tablets e telas médias */
  .add-button {
    left: 80%;
    width: 80px;
    height: 80px;
  }
}
</style>