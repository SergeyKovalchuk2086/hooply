<template>
  <div>HOME PAGE</div>
  <div>
    <NuxtLink to="/players">К списку игроков</NuxtLink>
  </div>
  <div>
    <NuxtLink to="/players/1">К игроку 1</NuxtLink>
  </div>

  <div class="players">
    <NuxtLink
      v-for="player in players ?? []"
      :key="player.id"
      :to="`/players/${player.id}`"
      class="player-card"
    >
      <div class="number">#{{ player.number }}</div>
      <div class="name">{{ player.name }}</div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { players, error } = await usePlayers();
</script>

<style>
.players {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 8px;
}

.player-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 8px;
  border-radius: 12px;
  background: #f5f5f5;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;
}

.player-card:hover {
  transform: scale(1.05);
}

.number {
  font-size: 18px;
  font-weight: 700;
}

.name {
  margin-top: 4px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 360px) {
  .players {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
