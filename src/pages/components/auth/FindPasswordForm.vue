<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">
      비밀번호 찾기
    </div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input
        v-model="email"
        placeholder="가입한 이메일"
        outlined
        dense
      ></q-input>

      <q-btn
        type="submit"
        label="비밀번호 재설정"
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
import { sendPasswordReset } from 'src/service';
const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

const email = ref('');
const handleSubmit = async () => {
  await sendPasswordReset(email.value);
  $q.notify('이메일로 비밀번호 재설정 링크를 보냈습니다!👍');
  emit('closeDialog');
};
</script>

<style lang="scss" scoped></style>
