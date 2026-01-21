<template>
  <div class="page">
    <h1 class="title">Состав на игру</h1>

    <div class="team-names">
      <label class="field">
        <span class="field__label">Команда 1</span>
        <input v-model.trim="homeTeam" class="input" placeholder="Чёрные" />
      </label>

      <label class="field">
        <span class="field__label">Команда 2</span>
        <input v-model.trim="awayTeam" class="input" placeholder="Белые" />
      </label>
    </div>

    <div class="teams">
      <section class="team">
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

    <button class="btn create-btn" @click="onCreateGame">Создать игру</button>
  </div>
</template>

<script setup lang="ts">
import PlayerPickerSheet from "~/components/players/PlayerPickerSheet.vue";
import type { Player } from "~/types/player";

type Team = "black" | "white";

const { players } = await usePlayers();

const homeTeam = ref("Чёрные");
const awayTeam = ref("Белые");

const blackIds = ref<string[]>([]);
const whiteIds = ref<string[]>([]);

const TEAM_LIMIT = 5;

const blackSlotsLeft = computed(() => TEAM_LIMIT - blackIds.value.length);
const whiteSlotsLeft = computed(() => TEAM_LIMIT - whiteIds.value.length);

const blackPlayers = computed(() =>
  blackIds.value
    .map((id) => unref(players).find((p) => p.id === id))
    .filter((p): p is Player => p !== undefined)
);

const whitePlayers = computed(() =>
  whiteIds.value
    .map((id) => unref(players).find((p) => p.id === id))
    .filter((p): p is Player => p !== undefined)
);

// Игроки, которые ещё не добавлены никуда
const availablePlayers = computed(() => {
  const picked = new Set([...blackIds.value, ...whiteIds.value]);
  return unref(players).filter((p) => !picked.has(p.id));
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
const { createGame } = useCreateGame();

const onCreateGame = async () => {
  const { gameId } = await createGame({
    blackIds: blackIds.value,
    whiteIds: whiteIds.value,
    homeTeam: homeTeam.value,
    awayTeam: awayTeam.value,
  });

  navigateTo(`/games/${gameId}`);
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

.create-btn {
  margin-top: 16px;
  background: #2da42d;
}

@media (max-width: 420px) {
  .teams {
    grid-template-columns: 1fr;
  }
}

.team-names {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 14px 0 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 12px;
  opacity: 0.7;
}

.input {
  height: 40px;
  border-radius: 10px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  outline: none;
}

@media (max-width: 420px) {
  .team-names {
    grid-template-columns: 1fr;
  }
}
</style>
