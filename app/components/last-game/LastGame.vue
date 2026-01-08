<template>
  <div class="last-game">
    <div class="last-game__header">
      <span>{{ homeTeam }}</span>
      <span>{{ awayTeam }}</span>
    </div>

    <div class="last-game__score">
      <span>{{ homeScore }}</span>
      <span>{{ awayScore }}</span>
    </div>

    <div class="last-game__date">
      {{ date }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
}>();
</script>

<style scoped lang="css">
.last-game {
  padding: 12px 24px;
  background-color: #ffb81d;
  border-radius: 8px;
}

.last-game__header,
.last-game__score {
  display: flex;
}

.last-game__header span,
.last-game__score span {
  width: 50%;
  text-align: center;
}

.last-game__header {
  margin-bottom: 8px;
  font-size: 14px;
}

.last-game__score {
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 1px;
}

.last-game__date {
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  opacity: 0.8;
}
</style>
