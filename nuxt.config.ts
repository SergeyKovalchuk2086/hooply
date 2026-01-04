// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2026-01-04',
  modules: ['@nuxt/eslint'],

  typescript: {
    strict: true,
    typeCheck: true,
  },
})