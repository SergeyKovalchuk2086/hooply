<template>
  <div v-if="open" class="overlay" @click.self="close">
    <div class="sheet">
      <div class="sheet__header">
        <div class="sheet__title">
          Добавить в: <b>{{ teamLabel }}</b>
          <span class="sheet__hint"
            >мест: {{ props.limit - selected.size }}</span
          >
        </div>

        <button class="sheet__close" @click="close">✕</button>
      </div>

      <div class="sheet__search">
        <input v-model="q" class="input" placeholder="Поиск игрока..." />
      </div>

      <TransitionGroup name="reorder" tag="div" class="list">
        <label v-for="p in sortedPlayers" :key="p.id" class="row">
          <input
            type="checkbox"
            class="row__check"
            :checked="selected.has(p.id)"
            :disabled="!selected.has(p.id) && selected.size >= props.limit"
            @change="toggle(p.id)"
          />

          <span class="row__avatar" />
          <span class="row__name">{{ p.name }}</span>
          <span class="row__num">#{{ p.number }}</span>
        </label>
      </TransitionGroup>

      <div class="sheet__footer">
        <button class="btn" :disabled="selected.size === 0" @click="confirm">
          Добавить {{ selected.size }} / {{ props.limit }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Team = "black" | "white";
type Player = { id: string; name: string; number: number };

const props = defineProps<{
  open: boolean;
  team: Team;
  players: Player[];
  limit: number;
  initialSelectedIds?: string[];
}>();

const emit = defineEmits<{
  (e: "update:open", v: boolean): void;
  (e: "confirm", payload: { team: Team; selectedIds: string[] }): void;
}>();

const q = ref("");

// selected — Set, удобно для toggle
const selected = ref<Set<string>>(new Set(props.initialSelectedIds ?? []));

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      q.value = "";
      selected.value = new Set(props.initialSelectedIds ?? []);
    }
  }
);

const teamLabel = computed(() => (props.team === "black" ? "Чёрные" : "Белые"));

const close = () => emit("update:open", false);

const toggle = (id: string) => {
  const s = new Set(selected.value);

  // снять выбор можно всегда
  if (s.has(id)) {
    s.delete(id);
    selected.value = s;
    return;
  }

  // добавить — только если есть места
  if (s.size >= props.limit) return;

  s.add(id);
  selected.value = s;
};

/**
 * ✅ Сортировка: выбранные — вверху
 * Потом по имени (чтобы список был стабильный)
 * Также есть фильтр по поиску
 */
const sortedPlayers = computed(() => {
  const query = q.value.trim().toLowerCase();
  const list = query
    ? props.players.filter((p) => p.name.toLowerCase().includes(query))
    : props.players;

  const s = selected.value;

  return [...list].sort((a, b) => {
    const aSel = s.has(a.id) ? 1 : 0;
    const bSel = s.has(b.id) ? 1 : 0;
    if (aSel !== bSel) return bSel - aSel; // выбранные сверху
    return a.name.localeCompare(b.name, "ru"); // вторичная сортировка
  });
});

const confirm = () => {
  emit("confirm", {
    team: props.team,
    selectedIds: Array.from(selected.value),
  });
  close();
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 12px;
  z-index: 50;
}

.sheet {
  width: min(520px, 100%);
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  overflow: hidden;
  max-height: 82vh;
  display: flex;
  flex-direction: column;
}

.sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sheet__title {
  font-size: 14px;
}

.sheet__close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
}

.sheet__search {
  padding: 12px 14px;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  outline: none;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: transparent;
  color: inherit;
}

.list {
  padding: 4px 6px 10px;
  overflow: auto;
}

.row {
  display: grid;
  grid-template-columns: 24px 32px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 10px;
  border-radius: 12px;
}

.row:hover {
  background: rgba(255, 255, 255, 0.06);
}

.row__check {
  width: 18px;
  height: 18px;
}

.row__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.row__name {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row__num {
  font-size: 13px;
  opacity: 0.8;
}

.sheet__footer {
  padding: 12px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.btn {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.row__check:disabled {
  opacity: 0.5;
}
.sheet__hint {
  margin-left: 10px;
  font-size: 12px;
  opacity: 0.7;
}

/* Плавное перемещение при смене порядка */
.reorder-move {
  transition: transform 300ms ease;
}

/* Опционально: появление/исчезновение (если ты фильтруешь поиском) */
.reorder-enter-active,
.reorder-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}
.reorder-enter-from,
.reorder-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* Важно для leave: чтобы элементы не ломали поток при уходе */
.reorder-leave-active {
  position: absolute;
}
</style>
