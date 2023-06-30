import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] 
    },
    define: {
        'process.env': Object.assign(process.env,{BASE_URL:'测试'})
    },
    server: {
        port: 3001,
        host: '0.0.0.0',
        // proxy: {
        //     '/api': {
        //         target
        //     }
        // }
    }
})
