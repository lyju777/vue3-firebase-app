<template>
  <div v-if="editor" class="flex q-pa-xs">
    <q-btn
      flat
      dense
      icon="sym_o_format_bold"
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :color="editor.isActive('bold') ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_italic"
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :color="editor.isActive('italic') ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_strikethrough_s"
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :color="editor.isActive('strike') ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_link"
      @click="handleLinkMenu"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :color="editor.isActive('link') ? 'blue' : null"
    />
    <q-separator vertical inset spaced />
    <q-btn
      flat
      dense
      icon="code"
      @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :color="editor.isActive('code') ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_code_blocks"
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :color="editor.isActive('codeBlock') ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_quote"
      @click="editor.chain().focus().toggleBlockquote().run()"
      :color="editor.isActive('blockquote') ? 'blue' : null"
    />
    <q-btn flat dense icon="sym_o_image" @click="handleImageMenu" />
    <q-btn flat dense icon="sym_o_photo_library" />

    <q-btn
      flat
      dense
      icon="sym_o_format_h1"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :color="editor.isActive('heading', { level: 1 }) ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_h2"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :color="editor.isActive('heading', { level: 2 }) ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_h3"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :color="editor.isActive('heading', { level: 3 }) ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_list_bulleted"
      @click="editor.chain().focus().toggleBulletList().run()"
      :color="editor.isActive('bulletList') ? 'blue' : null"
    />
    <q-btn
      flat
      dense
      icon="sym_o_format_list_numbered"
      @click="editor.chain().focus().toggleOrderedList().run()"
      :color="editor.isActive('orderedList') ? 'blue' : null"
    />

    <q-btn
      flat
      dense
      icon="sym_o_horizontal_rule"
      @click="editor.chain().focus().setHorizontalRule().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_undo"
      @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
    />
    <q-btn
      flat
      dense
      icon="sym_o_redo"
      @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  editor: {
    type: Object,
  },
});

const handleLinkMenu = () => {
  if (props.editor.isActive('link')) {
    props.editor.chain().focus().unsetLink().run();
    return;
  }
  const previousUrl = props.editor.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === '') {
    props.editor.chain().focus().extendMarkRange('link').unsetLink().run();

    return;
  }

  // update link
  props.editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run();
};

const handleImageMenu = () => {
  const url = window.prompt('URL');

  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run();
  }
};
</script>

<style lang="scss" scoped></style>
