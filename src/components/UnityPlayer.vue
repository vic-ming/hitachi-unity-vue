<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface UnityPlayerProps {
  loaderUrl: string;
  config: any;
  onProgress?: (progress: number) => void;
  onLoaded?: (instance: any) => void;
  onError?: (error: any) => void;
}

const props = defineProps<UnityPlayerProps>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const unityInstance = ref<any>(null);
const isLoading = ref(true);
const progress = ref(0);

const loadUnity = () => {
  const script = document.createElement('script');
  script.src = props.loaderUrl;
  script.async = true;

  script.onload = () => {
    // @ts-ignore
    createUnityInstance(canvasRef.value, props.config, (p: number) => {
      progress.value = p;
      if (props.onProgress) props.onProgress(p);
    })
      .then((instance: any) => {
        unityInstance.value = instance;
        isLoading.value = false;
        if (props.onLoaded) props.onLoaded(instance);
        
        // Expose a global message handler for Unity -> Vue
        (window as any).onUnityMessage = (data: string) => {
          console.log('Message from Unity:', data);
          // Here you can emit events or call other functions
        };
      })
      .catch((err: any) => {
        console.error('Unity Load Error:', err);
        if (props.onError) props.onError(err);
      });
  };

  document.body.appendChild(script);
};

onMounted(() => {
  loadUnity();
});

onUnmounted(() => {
  if (unityInstance.value) {
    unityInstance.value.Quit().then(() => {
      unityInstance.value = null;
    });
  }
  // Cleanup scripts if necessary, though createUnityInstance usually handles its own lifecycle
});

// Method to send message to Unity
const sendMessage = (objectName: string, methodName: string, value: string | number | boolean) => {
  if (unityInstance.value) {
    unityInstance.value.SendMessage(objectName, methodName, value);
  } else {
    console.warn('Unity instance not ready');
  }
};

defineExpose({
  sendMessage,
  unityInstance,
  isLoading,
  progress,
});
</script>

<template>
  <div class="unity-container">
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>Loading Unity... {{ Math.round(progress * 100) }}%</p>
    </div>
    <canvas 
      id="unity-canvas" 
      ref="canvasRef" 
      class="unity-canvas"
      width="960"
      height="540"
      tabindex="-1"
    ></canvas>
  </div>
</template>

<style scoped>
.unity-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.unity-canvas {
  width: 100%;
  height: 100%;
  background-color: #231f20;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 10;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #646cff; /* Vite purple */
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
