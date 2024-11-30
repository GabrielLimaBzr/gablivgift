<template>
    <a href="#" class="card" v-if="item">
      <div class="card__image-container">
        <img v-if="item.image" :src="item.image" :alt="item.title" class="card__img" />
        <img src="../assets/giftsha.png" :alt="item.title" class="card__img" />
      </div>

      <div class="card__footer">
        <span>{{ item.title }}</span>
        <span>{{ item.estimatedPrice }}</span>
      </div>
    </a>

    <a href="#" class="card" v-else>
      <div class="card__image-container">
        <img
          src="https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI0OTY1ODM&ixlib=rb-1.2.1&q=80"
          alt="balloon with an emoji face" class="card__img">
      </div>

      <div class="card__footer">
        <span>Title</span>
        <span>Preço Estimado</span>
      </div>
    </a>
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
  overflow: hidden;
  color: var(--va-text-inverted);
  transform: translateZ(0);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-width: 100%;
}

.card__image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--border-radius);
  border: solid 3px hsla(0, 0%, 100%, 0.318);
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card__img {
  transform: scale(1.1); /* Aplica um leve zoom na imagem */
}

.card__footer {
  padding: 1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background:  var(--va-custom-bg);
  backdrop-filter: blur(var(--blur));
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom-left-radius:  var(--border-radius);
  border-bottom-right-radius:  var(--border-radius);
  z-index: 1; /* Mantém o footer acima da imagem */
}

.card__footer span:nth-of-type(1) {
  font-size: calc(var(--size) * 0.065);
}

.card__footer span:nth-of-type(2) {
  font-size: calc(var(--size) * 0.035);
}
</style>
