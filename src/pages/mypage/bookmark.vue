<template>
  <PostList :items="posts" />
</template>

<script setup>
import PostList from 'src/components/apps/post/PostList.vue';

const posts = Array.from(Array(20), (_, index) => ({
  id: 'A' + index,
  title: 'Vue3 Firebase 강의 ' + index,
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque excepturiconsequuntur dolor, ab repudiandae debitis placeat ipsam quaerat deleniticumque maiores tenetur, officia aut facilis? Veritatis maiores numquamaperiam animi?',
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  tags: ['html', 'css', 'javascript'],
  uid: 'uid',
  category: '카테고리' + index,
}));
</script>

<style lang="scss" scoped></style>
