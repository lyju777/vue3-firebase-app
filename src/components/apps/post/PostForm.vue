<template>
  <q-form>
    <q-card-section class="q-gutter-y-sm">
      <q-input v-model="titleModel" outlined placeholder="제목"></q-input>
      <q-select
        v-model="categoryModel"
        outlined
        :options="categories"
        option-label="rabel"
        option-value="value"
        emit-value
        map-options
      >
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>
      <TiptapEditor v-model="contentModel" />
      <q-input
        outlined
        placeholder="태그를 입력해주세요. (입력후 Enter)"
        prefix="#"
        v-model="tagField"
      ></q-input>
      <q-chip outline dense color="teal" removable @remove="removeTag"
        >vue.js</q-chip
      >
    </q-card-section>
    <q-separator></q-separator>
    <q-card-actions align="right">
      <slot name="actions">
        <q-btn flat label="취소하기" v-close-popup />
        <q-btn type="submit" flat label="저장하기" color="primary" />
      </slot>
    </q-card-actions>
  </q-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getCategories } from 'src/service/category';
import TiptapEditor from 'src/pages/components/tiptap/TiptapEditor.vue';

const props = defineProps({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  tags: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags',
]);

const titleModel = computed({
  get: () => props.title,
  set: val => emit('update:title', val),
});

const categoryModel = computed({
  get: () => props.category,
  set: val => emit('update:category', val),
});

const contentModel = computed({
  get: () => props.content,
  set: val => emit('update:content', val),
});

const tagField = ref('');

const removeTag = () => {
  console.log('removeTag');
};

const categories = getCategories();
</script>

<style lang="scss" scoped></style>
