import {resolve} from 'path'
import {defineConfig, externalizeDepsPlugin} from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        server: {
            proxy: {
                "/api": {
                    //这里如实添加自己的后端接口前缀
                    target: "http://localhost:8083",
                    changeOrigin: true,
                }
            }
        },
        plugins: [react()]
    }
})
