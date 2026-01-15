<template>
  <div class="home-page">
    <div class="content">
      <TopSection class="top-section" />
      <TopPlayers :players class="top-players" />

      <div class="last">
        <div class="last__title">Последняя игра</div>
        <LastGame
          home-team="Чёрные"
          away-team="Белые"
          :home-score="15"
          :away-score="20"
          date="7.01.2026 21:00–21:15"
        />
      </div>
    </div>

    <NuxtLink to="/create-game" class="start-wrapper">
      <div class="start-game">начать игру</div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { players } = await usePlayers();
</script>

<style scoped lang="css">
.home-page {
  --tabbar-h: 64px;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;

  /* создаём место под фиксированный tabbar */
  padding-bottom: calc(var(--tabbar-h) + env(safe-area-inset-bottom) + 16px);
}

/* всё содержимое */
.content {
  flex: 1; /* занимает всё доступное место */
  padding-bottom: 16px;
}

.top-section {
  margin-top: 63px;
}

.top-players {
  margin-top: 40px;
}

.last {
  margin-top: 40px;
}

.last__title {
  margin-bottom: 10px;
}

.start-wrapper {
  background: #000;
  text-decoration: none;
  padding: 16px;
}

.start-game {
  border-radius: 8px;
  height: 60px;
  background-color: #fd443a;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
