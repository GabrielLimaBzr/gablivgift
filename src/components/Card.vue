<template>
  <div class="card shadow-md">
    <div class="card__image-container" @click="toggleDescription">
      <div class="relative group">
        <span v-if="item.priority" class="priority drop-shadow-lg cursor-pointer">🔥</span>

        <!-- Popover -->
        <div
          class="absolute left-1/2 top-[3px] -translate-x-1/2 mt-2 bg-[#f32c42] text-white text-xs p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
          Prioridade alta!
        </div>
      </div>
      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="card__img" loading="lazy" />
      <img src="../assets/giftsha.png" :alt="item.title" class="card__img" loading="lazy" />
    </div>

    <div v-if="item.userId !== profile" class="w-full" style="background-color: var(--va-primary); height: 4px;" />
    <div v-else class="w-full" style="background-color: var(--va-secondary); height: 4px;" />

    <div v-if="activeTab != 'description'" class="card__footer grid grid-cols-2 gap-1">
      <div class="col-span-2">
        <span class="truncate font-bold text-lg">{{ item.title ? item.title : "Sem titulo" }}</span>
      </div>

      <div class="card__price col-span-2 flex
      justify-between items-center gap-3">
        <span style="width: 50%;" class="text-xs font-light">{{ getPriceLabel(item.estimatedPrice) }}</span>
        <VaChip v-show="item.category" square size="small" class="truncate">
          {{ getCategoryLabel(item.category) }}
        </VaChip>
      </div>

      <div class="card__details">
        <span>Em: {{ item.createdAt ? formatDate(item.createdAt) : "dd/MM/yyyy HH:mm" }}</span>
      </div>
    </div>

    <div v-else class="card__footer grid grid-cols-2 gap-1">
      <VaScrollContainer vertical class="max-h-20 col-span-2">
        <p class="break-words font-medium text-md">{{ item.description ? item.description : "Sem descrição" }}</p>
      </VaScrollContainer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: false,
    },
    profile: {
      type: Number,
      required: false,
    }
  },
  data() {
    return {
      activeTab: 'info',
      categories: [
        { label: 'Eletrônicos', value: 1 },
        { label: 'Roupas', value: 2 },
        { label: 'Cosméticos', value: 3 },
        { label: 'Livros', value: 4 },
        { label: 'Jogos', value: 5 },
        { label: 'Coisas de Casa', value: 6 },
        { label: 'Calçados', value: 7 },
        { label: 'Experiências', value: 8 },
        { label: 'Outros', value: 9 },
        { label: 'Brinquedos', value: 10 },
      ],

      estimatePrices: [
        { label: 'Mimo ', price: 'Mimo (até R$ 50)', value: 1 },
        { label: 'Detalhes que encatam', price: 'Detalhes que encatam (R$ 50 a R$ 100)', value: 2 },
        { label: 'Gestos marcantes', price: 'Gestos marcantes (R$ 100 a R$ 300)', value: 3 },
        { label: 'Supresa inesquecíveis', price: 'Supresa inesquecíveis (R$ 300 a R$ 500)', value: 4 },
        { label: 'É o meu sonho!', price: 'É o meu sonho! (acima de R$ 500)', value: 5 },
      ],
    }
  },
  methods: {
    getPriceLabel(value) {
      const price = this.estimatePrices.find(price => price.value === value);
      return price ? price.price : 'Sem valor';
    },



    getCategoryLabel(value) {
      const category = this.categories.find(cat => cat.value === value);
      return category ? category.label : 'Desconhecido';
    },


    formatDate(date) {
      if (!date) return "dd/MM/yyyy HH:mm";
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },

    toggleDescription() {
      this.activeTab = this.activeTab === 'info' ? 'description' : 'info';
    },
  }
};
</script>

<style>
.va-chip--small {
  font-size: 0.7rem;
  max-height: 100%;
}

.card {
  --blur: 16px;
  aspect-ratio: 1 / 1;
  position: relative;
  border-radius: var(--border-radius);
  color: var(--va-text-inverted);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card__image-container {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  position: relative;
  cursor: pointer;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card__img:hover {
  transform: scale(1.06);
}

.card__footer {
  padding: 0.4rem 0.8rem;
  width: 100%;
  background: var(--va-custom-bg);
  backdrop-filter: blur(var(--blur));
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  color: var(--va-text-inverted);
  height: 110px;
}

.priority {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.card__details {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.37);
  font-weight: bolder;
}

.card__price {
  font-size: 1rem;
  color: var(--va-highlight);
  font-weight: normal;
}
</style>
