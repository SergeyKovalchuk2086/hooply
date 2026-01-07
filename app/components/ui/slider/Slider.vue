<template>
  <div class="slider">
    <div class="slider-track">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.slider {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.slider-track {
  display: flex;
  gap: 12px;
}
</style>
