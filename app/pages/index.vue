<template>
  <div class="home-page">
    <TopSection class="top-setion" />
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
</template>

<script setup lang="ts">
const { players } = await usePlayers();
</script>

<style scoped lang="css">
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
</style>
