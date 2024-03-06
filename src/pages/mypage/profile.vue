<template>
  <div class="q-gutter-y-md">
    <BaseCard>
      <q-form @submit.prevent="handleSubmitProfile">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">프로필 변경</div>
          <q-input
            v-model="displayName"
            outlined
            dense
            label="닉네임"
          ></q-input>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-space></q-space>
          <q-btn
            type="submit"
            label="저장하기"
            flat
            color="primary"
            :loading="isLoadingProfile"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </BaseCard>
    <BaseCard>
      <q-form @submit.prevent="handleSubmitEmail">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">이메일 변경</div>
          <q-input v-model="email" outlined dense label="이메일"></q-input>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-space></q-space>
          <q-btn
            type="submit"
            label="저장하기"
            flat
            color="primary"
            :loading="isLoadingEmail"
          ></q-btn>
        </q-card-actions>
      </q-form>
    </BaseCard>
  </div>
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';
import BaseCard from 'src/components/base/BaseCard.vue';
import { updateUserEmail, updateUserProfile } from 'src/service';
import { useAuthStore } from 'src/stores/auth';
import { ref, watchEffect } from 'vue';

const authStore = useAuthStore();
const $q = useQuasar();

const { isLoading: isLoadingProfile, execute: executeProfile } = useAsyncState(
  updateUserProfile,
  null,
  {
    immediate: false,
    onSuccess: () => {
      $q.notify('프로필 수정 완료!');
    },
    onError: err => {
      $q.notify({
        type: 'negative',
        message: getErrorMessage(err.code),
      });
    },
  },
);

const displayName = ref('');
const handleSubmitProfile = () => executeProfile(0, displayName.value);
// const handleSubmitProfile = async () => {
//   await updateUserProfile(displayName.value);
//   $q.notify('프로필 수정 완료!');
// };

const { isLoading: isLoadingEmail, execute: executeEmail } = useAsyncState(
  updateUserEmail,
  null,
  {
    immediate: false,
    onSuccess: () => {
      $q.notify('이메일 수정 완료!');
    },
    onError: err => {
      $q.notify({
        type: 'negative',
        message: getErrorMessage(err.code),
      });
    },
  },
);

const email = ref('');
const handleSubmitEmail = () => executeEmail(0, email.value);
// const handleSubmitEmail = async () => {
//   await updateUserEmail(email.value);
//   $q.notify('이메일 수정 완료!');
// };

watchEffect(() => {
  displayName.value = authStore.user?.displayName;
  email.value = authStore.user?.email;
});
</script>

<style lang="scss" scoped></style>
