<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="params.category" />
      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />
        <PostList :items="posts" />
      </section>
      <PostRightBar
        class="col-3"
        @open-write-dialog="openWriteDialog"
        v-model:tags="params.tags"
      />
    </div>
    <PostWriteDialog
      v-model="postDialog"
      @complate="complateRegistrationPost"
    />
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';
import { getPost } from 'src/service';
import { useAsyncState } from '@vueuse/core';

const router = useRouter();
const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
});
// const goPostDetails = id => router.push(`/posts/${id}`);

const { state: posts, execute } = useAsyncState(getPost, [], {
  immediate: false,
  throwError: true,
});

watch(params, () => execute(0, params.value), {
  deep: true,
  immediate: true,
});

const postDialog = ref(false);
const openWriteDialog = () => {
  postDialog.value = true;
};

const complateRegistrationPost = () => {
  postDialog.value = false;
  execute(0, params.value);
};
</script>

<style lang="scss" scoped></style>
