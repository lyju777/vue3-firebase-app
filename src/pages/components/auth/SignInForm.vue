<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSignInEmail">
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
      ></q-input>
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호"
        outlined
        dense
      ></q-input>
      <DisplayError :code="error?.code" />
      <div>
        <q-btn
          type="sumbit"
          label="로그인하기"
          class="full-width"
          unelevated
          color="primary"
          :loading="isLoading"
        ></q-btn>
        <div class="flex justify-between">
          <q-btn
            label="비밀번호 찾기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'FindPasswordForm')"
          ></q-btn>
          <q-btn
            label="이메일 가입하기"
            color="secondary"
            flat
            dense
            size="13px"
            @click="$emit('changeView', 'SignUpForm')"
          ></q-btn>
        </div>
      </div>

      <q-separator></q-separator>
      <q-btn
        label="구글 계정으로 로그인 하기"
        class="full-width"
        unelevated
        color="primary"
        outline
        @click="handleSignInGoogle"
      ></q-btn>
    </q-form>
  </div>
</template>

<script setup>
import { signInWithGoogle, signInWithEmail } from 'src/service/auth';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import DisplayError from 'src/components/DisplayError.vue';
import { getErrorMessage } from 'src/utils/firebase/error-message';
import { useAsyncState } from '@vueuse/core';

const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

// const isLoading = ref(false);
// const error = ref(null);

const { isLoading, error, execute } = useAsyncState(signInWithEmail, null, {
  immediate: false,
  throwError: true,
  onSuccess: () => {
    $q.notify('환영합니다. :)');
    emit('closeDialog');
  },
  onError: err => {
    $q.notify({
      type: 'negative',
      message: getErrorMessage(err.code),
    });
  },
});

// 이메일 로그인
const form = ref({
  email: '',
  password: '',
});

const handleSignInEmail = () => {
  execute(1000, form.value);
};

// const handleSignInEmail = async () => {
//   try {
//     isLoading.value = true;
//     await signInWithEmail(form.value);
//     $q.notify('환영합니다. :)');
//     emit('closeDialog');
//   } catch (err) {
//     error.value = err;
//     $q.notify({
//       type: 'negative',
//       message: getErrorMessage(err.code),
//     });
//   } finally {
//     isLoading.value = false;
//   }
// };

// 로그인 (구글)
const handleSignInGoogle = async () => {
  await signInWithGoogle();
  $q.notify('환영합니다~! :)');
  emit('closeDialog');
};
</script>

<style lang="scss" scoped></style>
