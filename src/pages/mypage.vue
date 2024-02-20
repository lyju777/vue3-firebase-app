<template>
  <div>
    <div class="text-h4">Mypage</div>
    <ul>
      <li>
        <router-link to="/mypage/profile">Profile</router-link>
      </li>

      <li>
        <router-link to="/mypage/password">Password</router-link>
      </li>

      <li>
        <router-link to="/mypage/bookmark">Bookmark</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style lang="scss" scoped></style>
