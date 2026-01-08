<template>
  <TopSection class="top-setion" />
  <TopPlayers class="top-players" />
  <LastGame
    home-team="Чёрные"
    away-team="Белые"
    :home-score="15"
    :away-score="20"
    date="7.01.2026 21:00–21:15"
  />
</template>

<script setup lang="ts">
const { players, error } = await usePlayers();
</script>

<style scoped>
.top-section {
  margin-top: 63px;
}

.top-players {
  margin-top: 40px;
}
</style>
