<template>
  <div class="top-content">
    <div class="top-content__info">
      <div class="top-content__row">
        <span class="top-content__season">3 сезон</span>
        <span class="top-content__date">[7.01.26 — 08.02.26]</span>
      </div>
      <span class="top-content__league">Лига: Дети Бронни Джеймса</span>
    </div>

    <div class="top-content__image">
      <img src="/user-image.svg" alt="User avatar" />
    </div>
  </div>
</template>

<style scoped>
.top-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-content__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.top-content__row {
  display: flex;
  align-items: center;
}

.top-content__date {
  margin-left: 12px;
  opacity: 0.6;
  font-size: 14px;
}

.top-content__image img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
