<template>
  <BaseCard>
    <q-card-section>
      <div class="text-h6">프로필</div>
      <q-form class="q-gutter-y-md q-mt-md">
        <q-input outlined dense label="닉네임"></q-input>
        <q-input outlined dense label="이메일" readonly></q-input>
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
