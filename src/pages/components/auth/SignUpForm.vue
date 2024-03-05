<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>
    <q-form class="q-gutter-y-md" @submit.prevent="hadleSubmit">
      <q-input
        v-model="form.nickname"
        placeholder="닉네임"
        outlined
        dense
        :rules="[validateRequired]"
        hide-bottom-space
      ></q-input>
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined
        dense
        :rules="[validateRequired, validateEmail]"
        hide-bottom-space
      ></q-input>
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호(문자,숫자조합 8자 이상)"
        outlined
        dense
        :rules="[validateRequired, validatePassword]"
        hide-bottom-space
      ></q-input>
      <q-input
        v-model="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        outlined
        dense
        :rules="[
          validateRequired,
          val => validatePasswordConfirm(form.password, val),
        ]"
        hide-bottom-space
      ></q-input>

      <q-btn
        type="submit"
        label="가입하기"
        class="full-width"
        unelevated
        color="primary"
      ></q-btn>

      <q-separator></q-separator>
      <q-btn
        label="로그인 하기"
        class="full-width"
        unelevated
        color="black"
        flat
        @click="$emit('changeView', 'SignInForm')"
      ></q-btn>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { signUpWithEmail } from 'src/service';
import {
  validateRequired,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from 'src/utils/valideate-rules';

const passwordConfirm = ref('');

const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

const form = ref({
  nickname: '',
  email: '',
  password: '',
});

const hadleSubmit = async () => {
  await signUpWithEmail(form.value);
  $q.notify('가입을 환영합니다. :)');
  $q.notify('이메일에서 인증 링크를 확인해주세요.');
  emit('closeDialog');
};
</script>

<style lang="scss" scoped></style>
