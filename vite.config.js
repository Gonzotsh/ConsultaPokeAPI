import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/consultaPokeAPI' ,
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                listapokemon: resolve(__dirname, 'listapokemon.html'),
                jscargarpokemon: resolve(__dirname, 'listaPokemon.js'),
                importaciones: resolve(__dirname, 'importaciones.js')
            },
        },
    },
})