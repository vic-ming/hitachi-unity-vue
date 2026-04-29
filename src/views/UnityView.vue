<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UnityPlayer from '../components/UnityPlayer.vue';



const route = useRoute();
const router = useRouter();

const buildId = computed(() => route.params.buildId as string);

// Map each buildId to its Unity config
const buildConfigs: Record<string, { loaderUrl: string; config: any; label: string }> = {
  Hit: {
    label: '智慧選配編輯器',
    loaderUrl: '/Hit/Build.loader.js',
    config: {
      arguments: [],
      dataUrl: '/Hit/Build.data.unityweb',
      frameworkUrl: '/Hit/Build.framework.js.unityweb',
      codeUrl: '/Hit/Build.wasm.unityweb',
      streamingAssetsUrl: '/Hit/StreamingAssets',
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
  EAS: {
    label: '智慧選配編輯器 II',
    loaderUrl: '/EAS/Build.loader.js',
    config: {
      arguments: [],
      dataUrl: '/EAS/Build.data.unityweb',
      frameworkUrl: '/EAS/Build.framework.js.unityweb',
      codeUrl: '/EAS/Build.wasm.unityweb',
      streamingAssetsUrl: '/EAS/StreamingAssets',
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

    <!-- Unity Player (16:9 強制比例) -->
    <div v-else class="unity-stage">
      <UnityPlayer
        :loader-url="currentBuild.loaderUrl"
        :config="currentBuild.config"
      />
    </div>
  </div>
</template>

<style scoped>
.unity-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 16:9 強制比例容器，會自動 letterbox / pillarbox */
.unity-stage {
  aspect-ratio: 16 / 9;
  width: min(100vw, calc(100vh * 16 / 9));
  height: min(100vh, calc(100vw * 9 / 16));
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
