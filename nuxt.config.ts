import path from 'path'
import { defineNuxtConfig } from 'nuxt3'
import '@nuxt3/apollo-module'
import '@unocss/nuxt'
import viteSvgIcons from 'vite-plugin-svg-icons'

export default defineNuxtConfig({
  build: {
    transpile: ['graphql'],
  },
  buildModules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    // './modules/graphql-codegen-module.ts',
    '@nuxt3/graphql-codegen-module',
    // './modules/apollo-module.ts',
    '@nuxt3/apollo-module',
  ],
  apollo: {
    trevorblades: {
      uri: 'https://countries.trevorblades.com/',
    },
    default: {
      uri: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/graphql` : 'http://localhost:3000/api/graphql',
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
