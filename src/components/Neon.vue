<template>
  <div class="font-bold"
    :class="['letter-box', { 'letter-box--active': isActive } ]"
    @click="toggleActive"
  >
    {{ letter }}
  </div>
</template>

<script>
export default {
  name: "LetterBox",
  props: {
    letter: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  background: #18191f;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter-box {
  position: relative;
  height: 80px;
  width: 80px;
  background: #18191f;
  color: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 46px;
  cursor: pointer;
  margin: 0 4px;
  border-radius: 20px;
  box-shadow: -1px -1px 4px rgba(255, 255, 255, 0.05),
    4px 4px 6px rgba(0, 0, 0, 0.2),
    inset -1px -1px 4px rgba(255, 255, 255, 0.05),
    inset 1px 1px 1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, color 0.3s ease;
}

.letter-box--active {
  box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.05),
    inset 4px 4px 6px rgba(0, 0, 0, 0.2);
  color: yellow;
  text-shadow: 0 0 15px yellow, 0 0 25px yellow;
  animation: glow 1.5s linear infinite;
}

/* Responsividade */
@media (max-width: 768px) {
  .letter-box {
    height: 60px;
    width: 60px;
    font-size: 32px;
  }
}

@media (max-width: 480px) {
  .letter-box {
    height: 50px;
    width: 50px;
    font-size: 24px;
  }
}

@keyframes glow {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
