<template>
  <q-page padding>
    <div class="text-h4">커뮤니티 목록</div>
    <section class="q-gutter-y-sm q-mt-lg">
      <q-card v-for="id in 100" :key="id" @click="goPostDetails(id)">
        <q-card-section>{{ id }}번 게시글</q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goPostDetails = id => router.push(`/posts/${id}`);
</script>

<style lang="scss" scoped></style>
