// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2026-01-04',
  modules: ['@nuxt/eslint', '@nuxtjs/supabase'],

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: true,
  },

  supabase: {
    redirect: false // важно, чтобы не мешал роутам
  }
})