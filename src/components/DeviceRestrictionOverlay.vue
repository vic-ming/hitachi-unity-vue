<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isRestricted = ref(false);

const checkDevice = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth < 900;
  isRestricted.value = isMobile || isSmallScreen;
};

onMounted(() => {
  checkDevice();
  window.addEventListener('resize', checkDevice);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkDevice);
});
</script>

<template>
  <div v-if="isRestricted" class="device-restriction-overlay">
    <div class="restriction-content">
      <img class="restriction-icon" src="/limit.png" alt="limit">
      <div class="restriction-text">
        <p>本系統僅支援電腦</p>
        <p>請更換裝置開啟</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.device-restriction-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000CC;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.restriction-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.restriction-icon {
  width: 109px;
  height: auto;
}

.restriction-text {
  text-align: center;
  color: white;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 1px;
}

.restriction-text p {
  margin: 0;
}
</style>
