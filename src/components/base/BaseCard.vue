<template>
  <q-card :flat="flat" :bordered="bordered" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name">
      <slot :name="name"></slot>
    </template>
  </q-card>
</template>

<script setup>
defineProps({
  flat: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped></style>
