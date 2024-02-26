<template>
  <q-page padding>
    <PostDetails />

    <q-separator class="q-my-xl"></q-separator>

    <PostComments />
  </q-page>
</template>

<script setup>
import PostDetails from './components/PostDetails.vue';
import PostComments from './components/PostComments.vue';
</script>

<style lang="scss" scoped></style>
<route lang="yaml">
meta:
  width: 800px
</route>
