<template>
  <div class="page">
    <h1 class="title">Состав на игру</h1>

    <div class="teams">
      <section class="team">
        <h2 class="team__title">Чёрные</h2>

        <div class="team__list">
          <div v-for="p in blackPlayers" :key="p.id" class="chip">
            <span class="chip__avatar" />
            <span class="chip__name">{{ p.name }}</span>
            <button class="chip__remove" @click="removeFromBlack(p.id)">
              ✕
            </button>
          </div>
        </div>

        <button class="btn" @click="openSheet('black')">Добавить</button>
      </section>

      <section class="team">
        <h2 class="team__title">Белые</h2>

        <div class="team__list">
          <div v-for="p in whitePlayers" :key="p.id" class="chip">
            <span class="chip__avatar" />
            <span class="chip__name">{{ p.name }}</span>
            <button class="chip__remove" @click="removeFromWhite(p.id)">
              ✕
            </button>
          </div>
        </div>

        <button class="btn" @click="openSheet('white')">Добавить</button>
      </section>
    </div>

    <PlayerPickerSheet
      v-model:open="sheetOpen"
      :team="sheetTeam"
      :players="availablePlayers"
      :limit="sheetLimit"
      :initial-selected-ids="sheetInitialSelectedIds"
      @confirm="onConfirmPick"
    />
  </div>
</template>

<script setup lang="ts">
import PlayerPickerSheet from "~/components/players/PlayerPickerSheet.vue";

type Team = "black" | "white";

type Player = {
  id: string;
  name: string;
  number: number;
  avatar_url?: string | null;
};

// TODO : заменить на игроков с supabase
const players = ref<Player[]>([
  { id: "p1", name: "Ковальчук С.", number: 3 },
  { id: "p2", name: "Иванов С.", number: 9 },
  { id: "p3", name: "Петров С.", number: 12 },
  { id: "p4", name: "Тугодум С.", number: 7 },
  { id: "p5", name: "Серун С.", number: 5 },
  { id: "p6", name: "Ворчун С.", number: 11 },
  { id: "p7", name: "Лопаткин С.", number: 1 },
]);

const blackIds = ref<string[]>([]);
const whiteIds = ref<string[]>([]);

const TEAM_LIMIT = 5;

const blackSlotsLeft = computed(() => TEAM_LIMIT - blackIds.value.length);
const whiteSlotsLeft = computed(() => TEAM_LIMIT - whiteIds.value.length);

const blackPlayers = computed(
  () =>
    blackIds.value
      .map((id) => players.value.find((p) => p.id === id))
      .filter(Boolean) as Player[]
);

const whitePlayers = computed(
  () =>
    whiteIds.value
      .map((id) => players.value.find((p) => p.id === id))
      .filter(Boolean) as Player[]
);

// Игроки, которые ещё не добавлены никуда
const availablePlayers = computed(() => {
  const picked = new Set([...blackIds.value, ...whiteIds.value]);
  return players.value.filter((p) => !picked.has(p.id));
});

const removeFromBlack = (id: string) => {
  blackIds.value = blackIds.value.filter((x) => x !== id);
};

const removeFromWhite = (id: string) => {
  whiteIds.value = whiteIds.value.filter((x) => x !== id);
};

// ===== Bottom-sheet control =====
const sheetOpen = ref(false);
const sheetTeam = ref<Team>("black");
const sheetInitialSelectedIds = ref<string[]>([]);

const sheetLimit = ref(5);

const openSheet = (team: Team) => {
  sheetTeam.value = team;
  sheetInitialSelectedIds.value = [];

  sheetLimit.value =
    team === "black" ? blackSlotsLeft.value : whiteSlotsLeft.value;
  sheetOpen.value = true;
};

// При подтверждении добавляем выбранных игроков в нужную команду
const onConfirmPick = (payload: { team: Team; selectedIds: string[] }) => {
  const { team, selectedIds } = payload;

  if (team === "black") {
    const slots = blackSlotsLeft.value;
    blackIds.value = [...blackIds.value, ...selectedIds.slice(0, slots)];
  } else {
    const slots = whiteSlotsLeft.value;
    whiteIds.value = [...whiteIds.value, ...selectedIds.slice(0, slots)];
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.teams {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.team {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 12px;

  display: flex;
  flex-direction: column;
}

.team__title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}

.team__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
}

.chip {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  padding: 10px;
}

.chip__avatar {
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
}
.chip__name {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chip__remove {
  margin-left: auto;
  border: none;
  background: transparent;
  color: #ff4d4d;
  font-size: 16px;
  cursor: pointer;
}

.btn {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: inherit;
  cursor: pointer;
  margin-top: auto;
}

@media (max-width: 420px) {
  .teams {
    grid-template-columns: 1fr;
  }
}
</style>
