import path from 'path'
import { defineNuxtConfig } from 'nuxt3'
import '@nuxt3/apollo-module'
import '@unocss/nuxt'
import viteSvgIcons from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
  build: {
    transpile: [
      '@apollo/client',
      'ts-invariant/process',
    ],
  },
  buildModules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt3/graphql-codegen-module',
    '@nuxt3/apollo-module',
    './modules/apollo-module.ts',
  ],
  apollo: {
    default: {
      uri: 'https://countries.trevorblades.com/',
    },
    local: {
      uri: 'http://localhost:3344/api/graphql',
    },
  },
  unocss: {
    uno: true,
    attributify: true,
    preflight: true,
    icons: {
      scale: 1.2,
    },
    rules: [
      ['text-apollo', { color: '#112B49' }],
    ],
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    plugins: [
      viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'assets/svgs/')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  },
})
