<template>
  <q-page padding>
    <BaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>
      <q-separator></q-separator>
      <PostForm
        v-model:title="form.title"
        v-model:category="form.category"
        v-model:content="form.content"
        @submit.prevent
      >
        <template #actions>
          <q-btn flat label="취소" v-close-popup />
          <q-btn type="submit" flat label="수정" color="primary" />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>
</template>
<script>
const getInitialForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: [],
});
</script>
<script setup>
import { ref } from 'vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import PostForm from 'src/components/apps/post/PostForm.vue';

const form = ref(getInitialForm());
</script>

<style lang="scss" scoped></style>
<route lang="yaml">
meta:
  width: 800px
</route>
