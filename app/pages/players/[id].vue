<template>
  <div v-if="!player">NO PLAYER DATA</div>
  <div v-else class="page">
    <div class="profile">
      <img class="avatar" src="/user-image.svg" />
      <h1 class="name">{{ player.name }}</h1>
      <div class="section-title">ПРОФАЙЛ</div>
    </div>

    <div class="card">
      <div class="card-title">Детали игрока</div>
      <div class="grid-2">
        <div>
          <div class="value">{{ player.age }} лет</div>
          <div class="muted">{{ player.birthdate }}</div>
        </div>
        <div class="right">
          <div class="value">{{ player.height }}</div>
          <div class="muted">Рост</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Следующая игра</div>
      <div class="center muted">15.01 21:00</div>
      <div class="teams">
        <span>чёрные</span>
        <span class="divider" />
        <span>белые</span>
      </div>
      <div class="center muted">«Энергетик»</div>
    </div>

    <div v-if="player.playerTotalStats" class="card">
      <div class="card-title">Статистика</div>
      <div class="stats">
        <div class="stat">
          <div class="value">{{ player.playerTotalStats.two_pt ?? 0 }}</div>
          <div class="muted">2PT</div>
        </div>
        <div class="stat">
          <div class="value">{{ player.playerTotalStats.three_pt ?? 0 }}</div>
          <div class="muted">3PT</div>
        </div>
        <div class="stat">
          <div class="value">{{ player.playerTotalStats.fouls ?? 0 }}</div>
          <div class="muted">Fouls</div>
        </div>
        <div class="stat">
          <div class="value">{{ player.playerTotalStats.games_played }}</div>
          <div class="muted">games</div>
        </div>
        <div class="stat">
          <div class="value">30 min</div>
          <div class="muted">time</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

// TODO : использовать pending и error
const {
  data: player,
  // pending,
  // error,
} = await useAsyncData(`player-${route.params.id}`, () =>
  usePlayer(route.params.id as string)
);
</script>

<style scoped>
.page {
  background: #000;
  color: #fff;
}
.profile {
  text-align: center;
  margin-bottom: 24px;
}

.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 12px;
}

.name {
  font-size: 20px;
  font-weight: 600;
}

.section-title {
  margin-top: 16px;
  font-size: 14px;
  letter-spacing: 1px;
}

.card {
  border: 1px solid #f5c400;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
}

.card-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.right {
  text-align: right;
}

.value {
  font-size: 20px;
  font-weight: 600;
}

.muted {
  opacity: 0.7;
}

.center {
  text-align: center;
}

.teams {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  font-size: 20px;
  margin: 12px 0;
}

.divider {
  width: 1px;
  height: 24px;
  background: #555;
}

.stats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.stat {
  text-align: center;
}

/* первые 3 показателя — по 2 колонки = 3 в ряд */
.stat:nth-child(1),
.stat:nth-child(2),
.stat:nth-child(3) {
  grid-column: span 2;
}

/* последние 2 показателя — по 3 колонки = 2 в ряд */
.stat:nth-child(4),
.stat:nth-child(5) {
  grid-column: span 3;
}

.stat {
  text-align: center;
}
</style>
