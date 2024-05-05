<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-2">
    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar>
        <q-btn flat dense to="/">
          <q-toolbar-title>
            <q-avatar>
              <img
                :src="`https://firebasestorage.googleapis.com/v0/b/vue3-firevbase-app.appspot.com/o/image.jpg?alt=media&token=${variable}`"
              />
            </q-avatar>
            FE_기록하는 습관
          </q-toolbar-title>
        </q-btn>
        <q-space></q-space>
        <q-btn stretch flat label="Home" to="/home" />
        <q-btn
          stretch
          flat
          label="깃허브"
          href="https://github.com/lyju777"
          target="_blank"
        />
        <q-btn
          stretch
          flat
          label="블로그"
          href="https://velog.io/@lyju777/posts"
          target="_blank"
        />
        <q-separator vertical class="q-my-md q-mr-md" />
        <q-btn
          v-if="!authStore.isAuthenticated"
          unelevated
          rounded
          color="primary"
          label="로그인 / 회원가입"
          @click="openAuthDialog"
        />
        <q-btn v-if="authStore.isAuthenticated" round flat>
          <q-avatar>
            <img
              :src="
                authStore.user.photoURL ||
                generateDefaultPhotoURL(authStore.user.uid)
              "
            />
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 140px">
              <q-item
                v-if="authStore.user.emailVerified"
                clickable
                v-close-popup
                to="/mypage/profile"
              >
                <q-item-section>프로필</q-item-section>
              </q-item>
              <q-item v-else clickable v-close-popup>
                <q-item-section class="text-red" @click="varifyEmail"
                  >이메일을 인증해주세요.</q-item-section
                >
              </q-item>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>로그아웃</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>
    <AuthDialog v-model="authDialog" />
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import {
  logout,
  generateDefaultPhotoURL,
  sendVerificationEmail,
} from 'src/service';

import AuthDialog from 'src/pages/components/auth/AuthDialog.vue';
import { useQuasar } from 'quasar';

// top bar profile image
const variable = import.meta.env.VITE_TOP_PROFILE_IMAGE;

const $q = useQuasar();

const authStore = useAuthStore();

const route = useRoute();
// console.dir(route);

const pageContainerStyles = computed(() => ({
  maxWidth: route.meta?.width || '1080px',
  margin: '0 auto',
}));

const authDialog = ref(false);
const openAuthDialog = () => {
  authDialog.value = true;
};

const handleLogout = async () => {
  await logout();
  $q.notify('로그아웃 되었습니다.');
};

const varifyEmail = () => {
  sendVerificationEmail();
  $q.notify('이메일을 확인해주세요!');
};
</script>
