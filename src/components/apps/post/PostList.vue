<template>
  <q-list bordered separator>
    <PostItem v-for="item in items" :key="item.id" :item="item" />
  </q-list>
</template>

<script setup>
import PostItem from './PostItem.vue';
defineProps({
  items: Array,
  default: () => [],
});
</script>

<style lang="scss" scoped></style>
