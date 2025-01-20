<template>
  <div class="card shadow-md">
    <div class="card__image-container" @click="toggleDescription">
      <span v-if="item.priority" class="priority drop-shadow-lg">🔥</span>
      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="card__img" loading="lazy" />
      <img src="../assets/giftsha.png" :alt="item.title" class="card__img" loading="lazy" />
    </div>

    <div v-if="activeTab != 'description'" class="card__footer grid grid-cols-2">
      <div class="card__title col-span-2">
        <span>{{ item.title ? item.title : "Sem titulo" }}</span>
      </div>
      <div class="card__price col-span-2 flex
      justify-between">
        <span style="max-width: 60%;" class="text-sm font-light">{{ getPriceLabel(item.estimatedPrice)}}</span>
        <VaChip v-show="item.category" size="small" square>
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
  },
  data() {
    return {
      activeTab: 'info',
      categories: [
        { label: 'Eletrônicos', value: 1 },
        { label: 'Roupas', value: 2 },
        { label: 'Decoração', value: 3 },
        { label: 'Livros', value: 4 },
        { label: 'Jogos', value: 5 },
        { label: 'Utensílios Domésticos', value: 6 },
        { label: 'Viagens', value: 7 },
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
      console.log(value);
      
      const price = this.estimatePrices.find(price => price.value === value);
      return price ? price.price : 'Sem valor'; // Retorna 'Desconhecido' se não encontrar
    },



    getCategoryLabel(value) {
      const category = this.categories.find(cat => cat.value === value);
      return category ? category.label : 'Desconhecido'; // Retorna 'Desconhecido' se não encontrar
    },


    formatDate(date) {
      if (!date) return "dd/MM/yyyy HH:mm"; // Retorna o formato padrão se a data não estiver presente
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('pt-BR', options); // Formata para o formato brasileiro
    },

    toggleDescription() {
      this.activeTab = this.activeTab === 'info' ? 'description' : 'info';
    },
  }
};
</script>

<style>

.card {
  --blur: 16px;
  width: 100%;
  height: 300px;
  aspect-ratio: 3 / 2;
  position: relative;
  border-radius: var(--border-radius);
  color: var(--va-text-inverted);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 100%;
}

.card__image-container {
  width: 100%;
  height: 100%;
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
  /* Aplica um leve zoom na imagem */
}

.card__footer {
  padding: 0.2rem 1rem 0.4rem 1rem;
  width: 100%;
  background: var(--va-custom-bg);
  backdrop-filter: blur(var(--blur));
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  border-top: solid 3px var(--va-primary);
  color: var(--va-text-inverted);
  height: 45%;
  /* Espaço entre os elementos */
}

/* Estilo do título e do ícone de prioridade */
.card__title {
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap;
  /* Garante que o texto fique em uma única linha */
  overflow: hidden;
  /* Esconde o texto que ultrapassa a largura da div */
  text-overflow: ellipsis;
}

.priority {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  /* Garante que fique acima da imagem */
}

/* Estilo das informações adicionais */
.card__details {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.37);
  font-weight: bolder;
}

/* Estilo do preço */
.card__price {
  font-size: 1rem;
  color: var(--va-highlight);
  font-weight: normal;
}
</style>
