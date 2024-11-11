<template>
  <div class="content">
    <a href="#" class="card">
      <div class="card__image-container">
        <img
          src="https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI0OTY1ODM&ixlib=rb-1.2.1&q=80"
          alt="balloon with an emoji face" class="card__img">
      </div>
      <div class="card__footer">
        <span>Awesome speedy card</span>
        <span>2 minutes!</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.content {
  border: solid 0px orange;

  margin: 30px;
}

.card {
  --blur: 16px;
  --size: clamp(300px, 50vmin, 600px);
  width: var(--size);
  aspect-ratio: 4 / 3;
  position: relative;
  border-radius: 2rem;
  overflow: hidden; /* Impede que a imagem amplie para fora do card */
  color: #000;
  transform: translateZ(0);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card__image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 2rem;
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
  background: hsl(0 0% 100% / 0.5);
  backdrop-filter: blur(var(--blur));
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  z-index: 1; /* Mantém o footer acima da imagem */
}

.card__footer span:nth-of-type(1) {
  font-size: calc(var(--size) * 0.065);
}

.card__footer span:nth-of-type(2) {
  font-size: calc(var(--size) * 0.035);
}
</style>
