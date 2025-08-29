import { defineConfig } from 'vite'

export default defineConfig({
    root: './src',
    base: '/3d-matrix-visualizer/',
    build: {
        outDir: '../dist',  
        emptyOutDir: true,
    },
});
