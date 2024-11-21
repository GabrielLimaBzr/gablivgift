<template>
    <div class="flex flex-col justify-center w-full items-center py-10">
        <h1 class="title">GabLivGifts</h1>
        <p class="sub">Aqui dividimos nossa lista de <span class="fra">presentes</span>, contem uma imensa lista de
            desesjos!</p>
        <div class="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10 p-2">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </div>
        <button class="add-button" @click="onAdd">
            <VaIcon class="w-full" name="redeem" size="2rem" />
        </button>
    </div>
</template>
<script setup>
import Card from '@/components/Card.vue';
</script>
<style>
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

/* Estilos do botão fixo */
.add-button {
  position: fixed;
  bottom: 6%; /* Distância da parte inferior */
  left: 50%; /* Centraliza horizontalmente */
  transform: translateX(-50%); /* Ajusta para o centro */
  background: hsla(0, 0%, 80%, 0.563);
  backdrop-filter: blur(6px);
  color: #fff; /* Cor do texto */
  border: none;
  border-radius: 50%; /* Torna o botão redondo */
  width: 100px; /* Largura */
  height: 100px; /* Altura */
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  cursor: pointer;
  font-size: 24px; /* Tamanho do texto */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-button:hover {
  background: hsla(0, 0%, 0%, 0.342);
  transform: translateX(-50%) scale(1.1); /* Efeito de zoom */
}

.add-button:active {
  background-color: #c1c1c1a4; /* Cor ao clicar */
}

/* Media Queries para responsividade */
@media (max-width: 768px) { /* Tablets e telas médias */
  .add-button {
    width: 80px;
    height: 80px;
  }
}

</style>