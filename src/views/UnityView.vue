<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UnityPlayer from '../components/UnityPlayer.vue';

const route = useRoute();
const router = useRouter();

const buildId = computed(() => route.params.buildId as string);

// Map each buildId to its Unity config
const buildConfigs: Record<string, { loaderUrl: string; config: any; label: string }> = {
  'unity-build': {
    label: '智慧選配編輯器',
    loaderUrl: '/unity-build/Build.loader.js',
    config: {
      arguments: [],
      dataUrl: '/unity-build/Build.data.unityweb',
      frameworkUrl: '/unity-build/Build.framework.js.unityweb',
      codeUrl: '/unity-build/Build.wasm.unityweb',
      streamingAssetsUrl: '/unity-build/StreamingAssets',
      companyName: 'Kingone',
      productName: '日立永大電梯_智慧選配編輯器',
      productVersion: '1.1.8',
      canvasId: 'unity-canvas',
      devicePixelRatio: 1,
      autoSyncPersistentDataPath: true,
      showBanner: (msg: string, type: string) => {
        console.warn(`Unity [${type}]: ${msg}`);
      },
    },
  },
  'unity-build-2': {
    label: '智慧選配編輯器 II',
    loaderUrl: '/unity-build-2/Build.loader.js',
    config: {
      arguments: [],
      dataUrl: '/unity-build-2/Build.data.unityweb',
      frameworkUrl: '/unity-build-2/Build.framework.js.unityweb',
      codeUrl: '/unity-build-2/Build.wasm.unityweb',
      streamingAssetsUrl: '/unity-build-2/StreamingAssets',
      companyName: 'Kingone',
      productName: '日立永大電梯_智慧選配編輯器 II',
      productVersion: '1.0.0',
      canvasId: 'unity-canvas',
      devicePixelRatio: 1,
      autoSyncPersistentDataPath: true,
      showBanner: (msg: string, type: string) => {
        console.warn(`Unity [${type}]: ${msg}`);
      },
    },
  },
};

const currentBuild = computed(() => buildConfigs[buildId.value]);

function goBack() {
  router.push({ name: 'landing' });
}
</script>

<template>
  <div class="unity-view">
    <!-- Not found state -->
    <div v-if="!currentBuild" class="not-found">
      <p>找不到指定的 Unity 模組：{{ buildId }}</p>
      <button class="back-btn-alt" @click="goBack">返回首頁</button>
    </div>

    <!-- Unity Player -->
    <template v-else>
      <UnityPlayer
        :loader-url="currentBuild.loaderUrl"
        :config="currentBuild.config"
      />
    </template>
  </div>
</template>

<style scoped>
.unity-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  gap: 1rem;
}

.back-btn-alt {
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  background: #3b82f6;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>
