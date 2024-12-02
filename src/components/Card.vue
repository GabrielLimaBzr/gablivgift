<template>
  <div class="card shadow-md">
    <div class="card__image-container">
      <span v-show="item.priority" class="priority drop-shadow-lg">🔥</span>
      <img v-if="item.image" :src="item.image" :alt="item.title" class="card__img" />
      <img src="../assets/giftsha.png" :alt="item.title" class="card__img" />
    </div>

    <div class="card__footer grid grid-cols-2 gap-1">
      <div class="card__title col-span-2">
        <span>{{ item.title ? item.title : "Sem titulo" }}</span>
      </div>
      <div class="card__price col-span-2 flex
      justify-between">
        <span>R$ {{ item.estimatedPrice ? item.estimatedPrice : "0,00" }}</span>
        <VaChip v-show="item.category" size="small" square>
          {{item.category}}
        </VaChip>
      </div>
      <div class="card__details">
        <span>Em: {{ item.addedDate ? item.addedDate : "dd/MM/yyyy HH:mm" }}</span>
      </div>
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
};
</script>

<style>
.card {
  --blur: 16px;
  width: 100%;
  aspect-ratio: 4 / 3;
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
  height: 90%;
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
  font-weight: lighter;
}

/* Estilo do preço */
.card__price {
  font-size: 1rem;
  color: var(--va-highlight);
  font-weight: normal;
}
</style>
