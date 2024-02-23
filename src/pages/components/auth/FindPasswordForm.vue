<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">
      비밀번호 찾기
    </div>
    <q-form class="q-gutter-y-md">
      <q-input placeholder="가입한 이메일" outlined dense></q-input>

      <q-btn label="확인" class="full-width" unelevated color="primary"></q-btn>

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
defineEmits(['changeView']);
</script>

<style lang="scss" scoped></style>
