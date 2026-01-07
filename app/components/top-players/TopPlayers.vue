<template>
  <Slider>
    <PlayerCard v-for="i in 5" name="Sergey Kovalchuk" :number="1" />
  </Slider>
</template>

<script setup lang="ts">
import Slider from "~/components/ui/slider/Slider.vue";
import PlayerCard from "~/components/players/PlayerCard.vue";
</script>
