<template>
  <q-card class="tiptap" flat bordered>
    <TiptapEditorMenu :editor="editor" />

    <q-separator />

    <editor-content class="editor__content" :editor="editor" />

    <div
      class="character-count flex justify-end text-teal q-pa-sm"
      v-if="editor"
    >
      <span>
        {{ editor.storage.characterCount.characters() }}/{{ limit }} characters
      </span>
      <span class="q-mx-sm">/</span>
      <span> {{ editor.storage.characterCount.words() }} words</span>
    </div>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

import TiptapEditorMenu from './TiptapEditorMenu.vue';
import CharacterCount from '@tiptap/extension-character-count';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const limit = ref(240);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: '마크다운을 이용해서 편리하게 글을 작성하세요.',
    }),
    Link,
    Image,
    CharacterCount.configure({
      limit: limit.value,
    }),
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
.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
<style lang="scss" scoped>
.editor__content {
  // 추가 start
  flex: 1;
  display: flex;
  overflow-y: auto;
  padding: 16px 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 400px;
  // 추가 end
}
</style>
