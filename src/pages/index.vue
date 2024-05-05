<template>
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar class="col-grow" v-model:category="category" />
      <section class="col-7">
        <PostHeader v-model:sort="sort" />
        <PostListSkeleton v-if="isLoading" />
        <PostList :items="items" escapeHTML />
        <div v-intersection-observer="handleIntersectionObserver"></div>
      </section>
      <PostRightBar
        class="col-3"
        v-model:tags="tags"
        @open-write-dialog="openWriteDialog"
      />
    </div>
    <PostWriteDialog
      v-model="postDialog"
      @complete="completeRegistrationPost"
    />
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

import { getPost } from 'src/service';
import { useAsyncState } from '@vueuse/core';
import { vIntersectionObserver } from '@vueuse/components';
import { usePostQuery } from 'src/composables/usePostQuery';
import { useAuthStore } from 'src/stores/auth';

import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';
import PostListSkeleton from 'src/components/skeletons/PostListSkeleton.vue';

const { category, sort, tags } = usePostQuery();
const authStore = useAuthStore();

const params = computed(() => ({
  category: category.value,
  tags: tags.value,
  sort: sort.value,
  limit: 6,
}));
const items = ref([]);
const start = ref(null);
const isLoadMore = ref(true);

const { execute, isLoading } = useAsyncState(getPost, [], {
  immediate: false,
  throwError: true,
  onSuccess: result => {
    if (start.value) {
      items.value = items.value.concat(result.items);
    } else {
      items.value = result.items;
    }
    isLoadMore.value = result.items.length >= params.value.limit;
    start.value = result.lastItem;
  },
});
watch(
  params,
  () => {
    start.value = null;
    execute(0, params.value);
  },
  {
    deep: true,
    // immediate: true,
  },
);

const postDialog = ref(false);
const openWriteDialog = () => {
  if (!authStore.isAuthenticated) {
    alert('로그인 후 이용 가능합니다.');
    return;
  }
  postDialog.value = true;
};
const completeRegistrationPost = () => {
  postDialog.value = false;
  start.value = null;
  execute(0, params.value);
};

// const vIntersectionObserver = {
//   beforeMount: (el, binding) => {
//     const observer = new IntersectionObserver(binding.value);
//     observer.observe(el);
//   },
// };

const loadMore = () => {
  execute(0, { ...params.value, start: start.value });
};

const handleIntersectionObserver = ([{ isIntersecting }]) => {
  if (isIntersecting && isLoadMore.value) {
    console.log('### handleIntersectionObserver ###');
    loadMore();
  }
};
</script>

<style lang="scss" scoped></style>
