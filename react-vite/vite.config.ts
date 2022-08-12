import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style(name) {
                        // use less
                        return `antd/es/${name}/style/index.js`
                    }
                },
            ]
        })
    ],
    css: {
        // css模块化，文件以.module.[css|less|scss]结尾，否则不生效的
        modules: {
            /**
             * 配置 CSS modules 的行为。选项将被传递给 postcss-modules。
             * 默认：'camelCaseOnly'。
             * 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly'
             * */
            localsConvention: 'dashesOnly'
        },
        // 指定传递给 CSS 预处理器的选项。
        preprocessorOptions: {
            // 预编译支持 less
            less: {
                // 支持内联 JavaScript
                javascriptEnabled: true,
            }
        }
    },
})
