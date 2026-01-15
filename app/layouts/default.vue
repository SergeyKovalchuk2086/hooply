<template>
  <div class="layout">
    <main class="content">
      <slot />
    </main>

    <nav class="tabbar">
      <NuxtLink to="/" class="tab" :class="{ active: route.path === '/' }">
        Домой
      </NuxtLink>

      <NuxtLink
        to="/players"
        class="tab"
        :class="{ active: route.path.startsWith('/players') }"
      >
        Игроки
      </NuxtLink>

      <NuxtLink
        to="/profile"
        class="tab"
        :class="{ active: route.path.startsWith('/profile') }"
      >
        Профиль
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: #000;
  color: #fff;
}

/* чтобы контент не уходил под tabbar */
.content {
  padding: 8px;
  padding-bottom: calc(72px + env(safe-area-inset-bottom));
}

/* нижний bar */
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  height: 64px;
  padding-bottom: env(safe-area-inset-bottom);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  background: #0b0b0b;
  border-top: 1px solid #222;
}

.tab {
  position: relative;

  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  color: rgba(255, 255, 255, 0.65);
  font-weight: 600;
  font-size: 14px;
}

/* underline */
.tab::after {
  content: "";
  position: absolute;
  bottom: 6px;

  width: 0;
  height: 2px;
  border-radius: 2px;

  background: #fd443a;
  transition: width 0.25s ease;
}

.tab.active {
  color: #fff;
}

.tab.active::after {
  width: 24px;
}
</style>
