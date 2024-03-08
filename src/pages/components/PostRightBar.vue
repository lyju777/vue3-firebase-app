<template>
  <StickySideBar>
    <q-btn
      padding="8px 12px 8px 8px"
      unlevated
      color="primary"
      text-color="white"
      class="full-width"
      @click="$emit('openWriteDialog')"
    >
      <q-avatar class="q-mr-sm" color="white" text-color="primary" size="22px">
        <q-icon name="edit" size="14px"></q-icon>
      </q-avatar>
      <span class="text-weight-bold">새 포스트 작성하기</span>
    </q-btn>
    <q-card class="q-mt-md bg-grey-1" bordered flat>
      <q-card-section class="flex items=center q-pb-none">
        <div class="text-weight-bold">태그</div>
        <q-space></q-space>
        <q-btn icon="refresh" dense size="sm" flat round color="grey"></q-btn>
      </q-card-section>
      <q-card-section class="q-pb-sm">
        <q-card class="q-px-sm" bordered flat square>
          <q-input
            borderless
            dense
            input-style="font-size: 12px"
            placeholder="태그로 검색해보세요."
            @keypress.enter.prevent="addTag"
          />
          <div class="q-gutter-sm q-pb-sm">
            <q-btn
              v-for="(tag, index) in tags"
              :key="tag"
              size="10px"
              padding="2px 4px 2px 7px"
              color="grey-3"
              text-color="dark"
              unelevated
              @click="removeTag(index)"
            >
              {{ tag }}
              <q-icon name="clear" size="12px" color="grey" unelevated></q-icon
            ></q-btn>
          </div>
        </q-card>
      </q-card-section>
      <q-list padding>
        <q-item clickable dense @click="addTag('vuejs')">
          <q-item-section side class="text-teal text-caption">
            #vuejs
          </q-item-section>
          <q-space></q-space>
          <q-item-section side class="text-teal text-caption">
            10
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import { ref, toRef } from 'vue';
import StickySideBar from 'src/components/StickySideBar.vue';
import { useTag } from 'src/composables/useTag';

const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['openWriteDialog', 'update:tags']);

const { addTag, removeTag } = useTag({
  tags: toRef(props, 'tags'),
  updateTags: tags => emit('update:tags', tags),
  maxLengthMessage: '태그는 10개 이상 등록할 수 없습니다!',
});
</script>

<style lang="scss" scoped></style>
