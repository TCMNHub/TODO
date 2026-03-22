import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            "@view": fileURLToPath(new URL("./src/views", import.meta.url)),
            "@control": fileURLToPath(new URL("./src/controls", import.meta.url)),
            "@icon": fileURLToPath(new URL("./src/icons", import.meta.url)),
            "@service": fileURLToPath(new URL("./src/services", import.meta.url)),
            "@component": fileURLToPath(new URL("./src/components", import.meta.url))
        },
    },
})
