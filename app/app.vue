<script setup lang="ts">
const score: number = 10;

const route = useRoute();

route.params.id; // типизировано
</script>

<template>
  <div>Score: {{ score }}</div>
</template>
