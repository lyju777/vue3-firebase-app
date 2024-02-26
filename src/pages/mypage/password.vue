<template>
  <BaseCard>
    <q-card-section>
      <div class="text-h6">비밀번호 변경</div>
      <q-form class="q-gutter-y-md q-mt-md">
        <q-input
          type="password"
          outlined
          dense
          label="새로운 비밀번호"
        ></q-input>
        <q-input
          type="password"
          outlined
          dense
          label="새로운 비밀번호 확인"
        ></q-input>
      </q-form>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-actions>
      <q-space></q-space>
      <q-btn label="저장하기" flat color="primary"></q-btn>
    </q-card-actions>
  </BaseCard>
</template>

<script setup>
import BaseCard from 'src/components/base/BaseCard.vue';
</script>

<style lang="scss" scoped></style>
