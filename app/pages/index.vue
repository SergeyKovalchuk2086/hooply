<template>
  <div>HOME PAGE</div>
  <div>
    <NuxtLink to="/players">К списку игроков</NuxtLink>
  </div>
  <div>
    <NuxtLink to="/players/1">К игроку 1</NuxtLink>
  </div>
</template>

<script setup lang="ts">
// TODO : удалить проверку работоспособности
// onMounted(async () => {
//   const supabase = useSupabaseClient();

//   const { data, error } = await supabase.from("test").select("*");

//   console.log("DATA :", data);
//   console.log("ERROR :", error);
// });
</script>
