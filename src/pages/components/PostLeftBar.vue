<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple :active="true">
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item v-for="cate in categories" :key="cate.value" clickable v-ripple>
          <q-item-section>{{ cate.rabel }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import StickySideBar from 'src/components/StickySideBar.vue';

const categories = [
  { rabel: 'Q&A', value: 'qna' },
  { rabel: '커뮤니티', value: 'community' },
  { rabel: '공지사항', value: 'notice' },
  { rabel: '강의', value: 'lecture' },
];
</script>
