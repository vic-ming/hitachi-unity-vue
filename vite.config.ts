import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Custom plugin to handle Unity WebGL compression and MIME types
const unityMiddleware = () => ({
  name: 'unity-middleware',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url || '';
      if (url.endsWith('.unityweb') || url.endsWith('.data')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/octet-stream');
      }
      if (url.endsWith('.wasm')) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/wasm');
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [vue(), unityMiddleware()],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  assetsInclude: ['**/*.unityweb', '**/*.set', '**/*.data'],
})
