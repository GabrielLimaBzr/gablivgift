<template>
  <div class="flex flex-col items-center justify-center text-white p-2">
    <h1 class="text-md sm:text-sm lg:text-lg font-100 mb-2 text-center">Contagem Regressiva para meu mozão chegar</h1>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-1 text-center w-full max-w-2xl">
      <div v-for="(time, label) in countdown" :key="label" class="flex flex-col items-center">
        <Neon :letter="time.value"></Neon>
        <div class="mt-1 text-sm sm:text-xs md:text-base">{{ time.label }}</div>
      </div>
    </div>
  </div>

</template>

<script>
import Neon from './Neon.vue';

export default {
  components: {Neon},
  data() {
    return {
      countdown: [
        { label: 'Dias', value: 0 },
        { label: 'Horas', value: 0 },
        { label: 'Minutos', value: 0 },
        { label: 'Segundos', value: 0 },
      ],
      targetDate: new Date('2025-02-15T00:00:00'),
    };
  },
  methods: {
    updateCountdown() {
      const now = new Date();
      const timeDifference = this.targetDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        this.countdown[0].value = days;
        this.countdown[1].value = hours;
        this.countdown[2].value = minutes;
        this.countdown[3].value = seconds;
      } else {
        clearInterval(this.interval);
      }
    },
  },
  mounted() {
    this.updateCountdown();
    this.interval = setInterval(this.updateCountdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style>
/* Estilização personalizada, se necessário */
</style>