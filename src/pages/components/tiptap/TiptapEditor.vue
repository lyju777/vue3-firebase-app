<template>
  <q-card class="tiptap" flat bordered>
    <TiptapEditorMenu :editor="editor" />

    <q-separator />

    <editor-content class="editor__content" :editor="editor" />
  </q-card>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { watch } from 'vue';
import Placeholder from '@tiptap/extension-placeholder';
import TiptapEditorMenu from './TiptapEditorMenu.vue';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: '마크다운을 이용해서 편리하게 글을 작성하세요.',
    }),
    Link,
    Image,
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value.getHTML());
  },
});

watch(
  () => props.modelValue,
  value => {
    const isSame = editor.value.getHTML() === value;
    if (isSame) {
      return;
    }
    editor.value.commands.setContent(value, false);
  },
);
</script>

<style lang="scss" src="src/css/tiptap.scss"></style>
<style lang="scss">
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
