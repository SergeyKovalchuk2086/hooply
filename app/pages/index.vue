<template>
  <TopSection class="top-setion" />
  <TopPlayers class="top-players" />
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
