<template>
  <NuxtLink class="player-card" to="/players/1">
    <div class="player-card__avatar">
      <img src="/user-image.svg" alt="Player avatar" />
    </div>

    <div class="player-card__info">
      <span class="player-card__name">{{ name }}</span>
      <span class="player-card__number">{{ number }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  number: number;
}>();
</script>

<style scoped>
.player-card {
  min-width: 127px;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  background-color: #3200e0;
}

.player-card__avatar img {
  width: 83px;
  height: 102px;
}

.player-card__info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: white;
}

.player-card__name {
  max-width: 60px;
  text-align: left;
}

.player-card__number {
  font-weight: 600;
  font-size: 24px;
}
</style>
