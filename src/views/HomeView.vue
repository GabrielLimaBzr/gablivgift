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

      <VaSelect v-model="valueZ" :options="precoAte" label="Preço Estimado:" class="col-span-1 w-[150px]"
        color="primary" text-by="label" track-by="value">
        <template #content="{ value }">
          <span class="textOption">
            {{ value.label }}
          </span>
        </template>
      </VaSelect>
    </div>

    <div
      class="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 p-2 md:px-1  sm:px-6">
      <div v-if="isLoading" v-for="n in 3" :key="n">
        <VaSkeletonGroup animation="wave">
          <VaCard>
            <VaSkeleton color="#7e7e7e" variant="squared" height="120px" />
            <VaCardContent class="flex items-center">
              <VaSkeleton color="#3E3E3E" variant="text" :lines="2" />
            </VaCardContent>
            <VaCardActions class="flex justify-end">
              <VaSkeleton color="#3E3E3E" class="mr-2" variant="rounded" inline width="64px" height="32px" />
            </VaCardActions>
          </VaCard>
        </VaSkeletonGroup>
      </div>

      <!-- Renderizar itens salvos -->
      <div v-else-if="savedItems && savedItems.length > 0" v-for="(item, index) in [...savedItems].reverse()"
        :key="index">
        <Card :item="item" />
      </div>

      <!-- Mensagem quando não há itens -->
      <div v-else class="w-full flex justify-center items-center col-span-3">
        <h1 class="text-1xl font-thin text-white p-4">Adicione um novo presente!</h1>
      </div>

      <button class="add-button" @click="openModal">
        <img class="w-full rounded img" src="../assets/logo.svg" alt="LoG">
        <span> + Presente</span>
      </button>
      <FormPresenteModal :is-active="showModal" @canceled="closeModal" @confirmed="handleConfirmed" />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import FormPresenteModal from '@/components/FormPresenteModal.vue';
import { getAllGifts } from '@/services/giftService';

const precoAteList = [
  { label: 'até R$ 50', value: 1 },
  { label: 'R$ 50 a R$ 100', value: 2 },
  { label: 'R$ 100 a R$ 300', value: 3 },
  { label: 'R$ 300 a R$ 500', value: 4 },
  { label: 'acima de R$ 500', value: 5 },
];

export default {
  components: { Card, FormPresenteModal },
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

      precoAte: precoAteList,
      valueZ: precoAteList[0],
      value: "Data",
      valueP: "Todos",
      showModal: false,
      savedItems: [],
      isLoading: true,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    handleConfirmed() {
      localStorage.removeItem('gifts');
      this.getGifts();
      console.log('Evento confirmado capturado!');
    },

    async getGifts() {
      try {
        const cacheKey = 'gifts';
        const cachedItems = localStorage.getItem('gifts');
        if (cachedItems) {
          const { data, timestamp } = JSON.parse(cachedItems);
          const isCacheValid = Date.now() - timestamp < 18000000;
          if (isCacheValid) {
            this.savedItems = data;
            return;
          }
        }
        this.savedItems = await getAllGifts();
        localStorage.setItem(cacheKey, JSON.stringify({ data: this.savedItems, timestamp: Date.now() }));
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },


  },

  mounted() {
    setTimeout(() => {
      this.getGifts();
    }, 0)
  },
}

</script>
<style scoped>
.img {
  width: 30px !important;
}

.fixed-size {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.textOption {
  color: var(--va-text-inverted) !important;
  font-size: 0.8rem;
}

.add-button {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 7%;
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
  z-index: 1000;
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