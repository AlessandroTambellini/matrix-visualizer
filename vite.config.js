import { defineConfig } from 'vite'

export default defineConfig({    
    root: './src',  // Tell Vite that src is the root
    build: {
        outDir: '../dist'  // Output to dist folder in project root
    }
})
