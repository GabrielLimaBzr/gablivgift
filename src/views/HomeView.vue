<template>
  <div class="flex flex-col justify-center w-full items-center py-10">
    <h1 class="title">GabLivGifts</h1>
    <p class="sub p-2 md:px-1  sm:px-6">Aqui dividimos nossa lista de <span class="fra">presentes</span>, contem uma
      imensa lista de
      desesjos!</p>

    <div class="my-5 grid grid-cols-3 gap-3 p-2 md:px-1 sm:px-6">
      <VaSelect v-model="ordenarValue" :options="ordenarPor" label="Ordernar por:" class="col-span-1" color="primary"
        text-by="label" track-by="label">
        <template #content="{ value }">
          <span class="textOption">
            {{ value.label }}
          </span>
        </template>
      </VaSelect>

      <VaSelect v-model="adcionadoValue" :options="adcionadorPor" label="Adicionado por:" class="col-span-1 w-[150px]"
        color="primary">
        <template #content="{ value }">
          <span class="textOption">
            {{ value }}
          </span>
        </template>
      </VaSelect>

      <VaSelect v-model="precoValue" :options="precoAte" label="Preço Estimado:" class="col-span-1 w-[150px]"
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
      <div v-else-if="savedItems && savedItems.length > 0" v-for="(item, index) in savedItems" :key="index">
        <Card :item="item" />
      </div>



      <!-- Mensagem quando não há itens -->
      <div v-else class="w-full flex justify-center items-center col-span-3">
        <h1 class="text-1xl font-thin text-white p-4">Adicione um novo presente!</h1>
      </div>
    </div>


    <div class="w-full flex justify-center flex-col items-center col-span-3" v-if="totalItems > 0">
      <h1 class="text-1xl font-thin text-white p-4">{{ `Total de Presente(s): ${totalItems}` }}</h1>
      <VaPagination @clicl="console.log(currentPage)" v-model="currentPage" :pages="totalPages" />
    </div>

    <button class="add-button" @click="openModal">
      <img class="w-full rounded img" src="../assets/logo.svg" alt="LoG">
      <span> + Presente</span>
    </button>
    <FormPresenteModal :is-active="showModal" @canceled="closeModal" @confirmed="handleConfirmed" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import FormPresenteModal from '@/components/FormPresenteModal.vue';
import { getGiftByFilter } from '@/services/giftService';

const precoAteList = [
  { label: 'Qualquer Valor', value: 0 },
  { label: 'até R$ 50', value: 1 },
  { label: 'R$ 50 a R$ 100', value: 2 },
  { label: 'R$ 100 a R$ 300', value: 3 },
  { label: 'R$ 300 a R$ 500', value: 4 },
  { label: 'acima de R$ 500', value: 5 },
];

const ordenarPorList = [
  { label: 'Mais recentes', value: 'createdAt', direction: 'desc' },
  { label: 'Mais antigos', value: 'createdAt', direction: 'asc' },
  { label: 'Categoria', value: 'category', direction: 'desc' },
  { label: 'Prioridade', value: 'priority', direction: 'desc' },


];

export default {
  components: { Card, FormPresenteModal },
  data() {
    return {
      adcionadorPor: ['Todos'],
      adcionadoValue: 'Todos',

      ordenarPor: ordenarPorList,
      ordenarValue: ordenarPorList[0],

      precoAte: precoAteList,
      precoValue: precoAteList[0],

      showModal: false,
      savedItems: [],
      isLoading: false,
      userDetail: null,

      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
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


    carregarAdcionadores() {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData) {
          this.userDetail = userData;
          const adicionadores = [userData.fullName];

          if (userData.couple && userData.couple.user) {
            adicionadores.push(userData.couple.user.fullName);
          }

          this.adcionadorPor.push(...adicionadores);
        }

      } catch (error) {
        console.error("Erro ao carregar os adicionadores:", error);
      }
    },


    async getFilter() {
      try {
        this.isLoading = true;

        const queryParams = new URLSearchParams();

        // Filtros dinâmicos para a URL
        if (this.precoValue !== null && this.precoValue.value !== 0) {
          queryParams.append("estimatedPrice", this.precoValue.value);
        }

        if (this.adcionadoValue === "Todos" && this.userDetail.couple) {
          queryParams.append("coupleId", this.userDetail.couple.id);
        } else if (this.adcionadoValue !== "Todos" && this.adcionadoValue) {
          if (this.adcionadoValue === this.userDetail.fullName) {
            queryParams.append("userId", this.userDetail.id);
          } else {
            queryParams.append("userId", this.userDetail.couple.user.id);
          }
        } else {
          queryParams.append("userId", this.userDetail.id);
        }


        if (this.ordenarValue !== null) {
          queryParams.append("orderBy", this.ordenarValue.value);
          queryParams.append("orderDirection", this.ordenarValue.direction);
        }

        queryParams.append("page", this.currentPage);

        // Chave de cache baseada nos parâmetros
        const cacheKey = `filter_${queryParams.toString()}`;
        const cachedItems = sessionStorage.getItem(cacheKey);

        const cacheTime = import.meta.env.VITE_CACHE_TIMING || 180000;
        console.log("Tempo de cache:", cacheTime);
        

        if (cachedItems) {
          const { data, timestamp, currentPage, totalItems, totalPages } = JSON.parse(cachedItems);
          const isCacheValid = Date.now() - timestamp < cacheTime;

          if (isCacheValid) {
            console.info("Cache válido, carregando dados salvos...");

            this.savedItems = data;
            this.currentPage = currentPage;
            this.totalItems = totalItems;
            this.totalPages = totalPages;
            return;
          } else {
            sessionStorage.removeItem(cacheKey);
          }
        }

        const response = await getGiftByFilter(queryParams.toString());
        this.savedItems = response.gifts;
        this.totalItems = response.total;
        this.totalPages = response.totalPages;

        this.saveCache(cacheKey);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    saveCache(cacheKey) {
      sessionStorage.setItem(cacheKey, JSON.stringify({ data: this.savedItems, timestamp: Date.now(), currentPage: this.currentPage, totalPages: this.totalPages, totalItems: this.totalItems }));
    },

  },

  mounted() {
    setTimeout(() => {
      this.carregarAdcionadores();
      this.getFilter();
    }, 0)
  },

  watch: {
    ordenarValue: {
      handler() {
        this.getFilter();
      },
      deep: true,
    },

    precoValue: {
      handler() {
        this.getFilter();
      },
      deep: true,
    },

    adcionadoValue: {
      handler() {
        this.getFilter();
      },
      deep: true,
    },

    currentPage: {
      handler() {
        this.getFilter();
      },
      deep: true,
    },
  },
}

</script>
<style>
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

  .va-select-option {
    font-size: 0.8rem !important;
  }

}
</style>