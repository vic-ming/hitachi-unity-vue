# Unity Build Files Instructions

Please place your Unity WebGL build files in this directory. 
By default, the `UnityPlayer` component expects the following naming convention (which you can change in `App.vue`):

- `Build.loader.js` (The main loader script)
- `Build.data` (Binary data)
- `Build.framework.js` (Framework code)
- `Build.wasm` (WebAssembly code)

### How to export from Unity:
1. Open Unity Project.
2. Go to `File` > `Build Settings`.
3. Select `WebGL` and click `Switch Platform`.
4. Click `Player Settings` > `Publishing Settings`.
5. Set `Compression Format` to `Disabled` (recommended for easiest integration) or ensure your server supports Gzip/Brotli.
6. Click `Build` and select this `public/unity-build` folder as the target (or copy the contents of the `Build` folder here).
