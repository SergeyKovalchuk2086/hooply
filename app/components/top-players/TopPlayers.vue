<template>
  <Slider>
    <PlayerCard v-for="player in players" :key="player.id" :player />
  </Slider>
</template>

<script setup lang="ts">
import Slider from "~/components/ui/slider/Slider.vue";
import PlayerCard from "~/components/players/PlayerCard.vue";

defineProps<{
  players: {
    id: string;
    name: string;
    number: number | null;
    team_id: string | null;
  }[];
}>();
</script>
