<template>
  <q-page padding>
    <div class="text-h4">useAsyncState</div>
    <q-separator spaced></q-separator>

    <p>state:{{ state }}</p>
  </q-page>
</template>

<script setup>
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const { state, isLoading, error, isReady } = useAsyncState(
  axios
    .get('https://jsonplaceholder.typicode.com/todos/1')
    .then(reponse => reponse.data),
);
</script>

<style lang="scss" scoped></style>
