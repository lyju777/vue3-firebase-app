<template>
  <div class="tiptap">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
});

const editor = useEditor({
  content: props.content,
  extensions: [StarterKit, Link, Image],
  editable: false,
});
</script>

<style lang="scss" src="src/css/tiptap.scss"></style>
