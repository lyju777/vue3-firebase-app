<template>
  <q-item class="bg-white q-pt-md" clickable :to="`posts/${id}`">
    <q-item-section avatar top>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex items-center">
        <span>닉네임 &middot;&nbsp;3일 전</span>
        <q-chip class="q-ml-sm" color="primary" text-color="white">
          {{ category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag in tags" :key="tag" class="q-mr-sm">#{{ tag }}</span>
      </div>
      <div class="text-grey-6 q-my-sm ellipsis-2-lines">{{ content }}</div>
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <q-icon name="sym_o_visibility" color="grey" size="xs" />
            <span class="text-grey q-ml-xs text-body2">{{ readCount }}</span>
            <q-tooltip :offset="[0, 4]">조회수</q-tooltip>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-icon name="sym_o_sms" color="grey" size="xs" />
            <span class="text-grey q-ml-xs text-body2">{{ commentCount }}</span>
            <q-tooltip :offset="[0, 4]">댓글수</q-tooltip>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent>
              <q-icon name="sym_o_favorite" color="grey" size="xs" />
              <span class="text-grey q-ml-xs text-body2">{{ likeCount }}</span>
              <q-tooltip :offset="[0, 4]">좋아요</q-tooltip>
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn class="full-width" flat dense @click.prevent>
              <q-icon name="sym_o_bookmark" color="grey" size="xs" />
              <span class="text-grey q-ml-xs text-body2">{{ readCount }}</span>
              <q-tooltip :offset="[0, 4]">북마크</q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  readCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  bookmarkCount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
  },
  createTime: {
    type: Date,
  },
  tags: {
    type: Array,
    default: () => {},
  },
  uid: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
