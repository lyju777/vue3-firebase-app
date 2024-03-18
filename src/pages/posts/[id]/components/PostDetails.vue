<template>
  <BaseCard class="q-pa-lg">
    <div class="flex q-mb-md">
      <q-btn
        icon="sym_o_arrow_back"
        flat
        round
        dense
        color="grey"
        size="16px"
        @click="$router.back()"
      ></q-btn>
      <q-space></q-space>
      <q-btn
        :icon="isLike ? 'favorite' : 'sym_o_favorite'"
        flat
        round
        dense
        color="red"
        size="16px"
        @click="toggleLike"
      ></q-btn>
      <q-btn
        icon="sym_o_bookmark"
        flat
        round
        dense
        color="blue"
        size="16px"
      ></q-btn>
    </div>
    <div class="flex items-center">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      <div class="q-ml-md">
        <div>짐코딩</div>
        <div class="text-grey-6">
          {{ date.formatDate(post.createdAt, 'YYYY. MM. DD HH:mm:ss') }}
        </div>
      </div>
      <q-space></q-space>
      <q-btn v-if="hasOwnContent(post.uid)" icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
              clickable
              v-close-popup
              :to="`/posts/${$route.params.id}/edit`"
            >
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="handleDeletePost">
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="q-mt-md text-h5 text-weight-bold">{{ post.title }}</div>
    <div class="text-teal">
      <span v-for="tag in post.tags" :key="tag">#{{ tag }}&nbsp;</span>
      {{ post.category }}
    </div>
    <div class="row items-center q-gutter-x-md q-mt-md justify-end">
      <postIcon name="sym_o_visibility" :label="post.readCount" />
      <postIcon name="sym_o_sms" :label="post.commentCount" />
      <postIcon name="sym_o_favorite" :label="likeCount" />
      <postIcon name="sym_o_bookmark" :label="post.bookmarkCount" />
    </div>
    <q-separator class="q-my-lg"></q-separator>
    <TiptapViewer v-if="post.content" :content="post.content" />
  </BaseCard>
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';
import { date, useQuasar } from 'quasar';
import postIcon from 'src/components/apps/post/postIcon.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import { useLike } from 'src/composables/useLike';
import TiptapViewer from 'src/pages/components/tiptap/TiptapViewer.vue';
import { deletePost, getPost_ } from 'src/service';
import { useAuthStore } from 'src/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const { hasOwnContent } = useAuthStore();
const { state: post, error } = useAsyncState(
  () => getPost_(route.params.id),
  {},
  {
    onSuccess: result => updateLickCount(result.likeCount),
  },
);

const { execute: executeDeletePost } = useAsyncState(deletePost, null, {
  immediate: false,
  onSuccess: () => {
    $q.notify('삭제완료!');
    router.push('/');
  },
});
const handleDeletePost = async () => {
  if (confirm('삭제 하시겠어요?') === false) {
    return;
  }
  await executeDeletePost(0, route.params.id);
};

const { isLike, likeCount, toggleLike, updateLickCount } = useLike(
  route.params.id,
);
</script>

<style lang="scss" scoped></style>
