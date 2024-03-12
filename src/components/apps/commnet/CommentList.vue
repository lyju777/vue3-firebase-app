<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <CommentItem
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      @delete="handleDeleteComment"
    />
  </q-list>
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';
import CommentItem from './CommentItem.vue';
import { deleteComment } from 'src/service';

const props = defineProps({
  postId: {
    type: String,
  },
  items: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['deleted']);

const { execute } = useAsyncState(deleteComment, null, {
  immediate: false,
  onSuccess: () => {
    emit('deleted');
  },
});
const handleDeleteComment = async commentId => {
  if (confirm('삭제 하시겠어요?') === false) {
    return;
  }
  await execute(0, props.postId, commentId);
};
</script>

<style lang="scss" scoped></style>
