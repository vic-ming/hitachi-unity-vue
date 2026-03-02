<script setup lang="ts">
import { ref } from 'vue';
import UnityPlayer from './components/UnityPlayer.vue';

// Unity configuration - Exactly matching your exported index.html
const unityConfig = {
  loaderUrl: "/unity-build/Build.loader.js",
  config: {
    arguments: [],
    dataUrl: "/unity-build/Build.data.unityweb",
    frameworkUrl: "/unity-build/Build.framework.js.unityweb",
    codeUrl: "/unity-build/Build.wasm.unityweb",
    streamingAssetsUrl: "/unity-build/StreamingAssets",
    companyName: "Kingone",
    productName: "日立永大電梯_智慧選配編輯器",
    productVersion: "1.1.8",
    // Adding canvasId to match Unity Player's requirement
    canvasId: "unity-canvas",
    // Match the original template's advice for mobile/performance
    devicePixelRatio: 1,
    // Fix deprecation warning for JS_FileSystem_Sync
    autoSyncPersistentDataPath: true,
    // Optional: add the banner function if needed for error display
    showBanner: (msg: string, type: string) => {
      console.warn(`Unity [${type}]: ${msg}`);
    },
  }
};

const unityPlayerRef = ref<any>(null);

const handleUnityMessage = (msg: string) => {
  console.log('Received from App.vue:', msg);
};

const sendDemoMessage = () => {
  // Example: Tell Unity to change object color
  // unityPlayerRef.value?.sendMessage('Cube', 'ChangeColor', 'Red');
  alert('Attempting to send message to Unity. Ensure your Unity build matches the method names!');
};
</script>

<template>
  <div class="app-container">
    <main class="main-content">
      <div class="unity-wrapper">
        <UnityPlayer 
          ref="unityPlayerRef"
          :loader-url="unityConfig.loaderUrl"
          :config="unityConfig.config"
        />
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --primary: #646cff;
  --primary-hover: #747bff;
  --bg-dark: #121212;
  --card-bg: #1e1e1e;
  --text-main: #e0e0e0;
  --text-muted: #a0a0a0;
  --border: rgba(255, 255, 255, 0.1);
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #fff;
  color: var(--text-main);
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  height: 2.5rem;
  filter: drop-shadow(0 0 10px var(--primary));
}

h1 {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 700;
}

.badge {
  font-size: 0.7rem;
  background: var(--primary);
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  vertical-align: middle;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  flex: 1;
  min-height: 0; /* Important for flex child with overflow */
}

.unity-wrapper {
  background: #000;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-card {
  background: var(--card-bg);
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.info-card h3 {
  margin-top: 0;
  font-size: 1rem;
  color: var(--primary);
}

.info-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #42b883;
  margin-top: 1rem;
}

.dot {
  width: 8px;
  height: 8px;
  background: #42b883;
  border-radius: 50%;
  box-shadow: 0 0 8px #42b883;
}

.mock-console {
  background: #0d0d0d;
  padding: 0.75rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: #a0a0a0;
  height: 150px;
  overflow-y: auto;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}

.footer {
  text-align: center;
  padding: 1rem 0;
  font-size: 0.8rem;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr;
  }
  .sidebar {
    order: 2;
  }
}
</style>
