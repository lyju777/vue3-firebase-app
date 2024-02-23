<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>
    <q-form class="q-gutter-y-md">
      <q-input placeholder="이메일" outlined dense></q-input>
      <q-input placeholder="비밀번호" outlined dense></q-input>
      <div>
        <q-btn
          label="로그인하기"
          class="full-width"
          unelevated
          color="primary"
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
      ></q-btn>
    </q-form>
  </div>
</template>

<script setup>
defineEmits(['changeView']);
</script>

<style lang="scss" scoped></style>
