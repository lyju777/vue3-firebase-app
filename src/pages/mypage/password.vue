<template>
  <BaseCard>
    <q-form @submit.prevent="handleSubmit">
      <q-card-section class="q-gutter-y-md">
        <div class="text-h6">비밀번호 변경</div>
        <q-input
          v-model="form.newPassword"
          type="password"
          outlined
          dense
          label="새로운 비밀번호"
        ></q-input>
        <q-input
          v-model="form.newPasswordConfirm"
          type="password"
          outlined
          dense
          label="새로운 비밀번호 확인"
        ></q-input>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions>
        <q-space></q-space>
        <q-btn type="submit" label="저장하기" flat color="primary"></q-btn>
      </q-card-actions>
    </q-form>
  </BaseCard>
</template>

<script setup>
import { useQuasar } from 'quasar';
import BaseCard from 'src/components/base/BaseCard.vue';
import { updateUserPassword } from 'src/service';
import { ref } from 'vue';

const form = ref({
  newPassword: '',
  newPasswordConfirm: '',
});

const $q = useQuasar();

const handleSubmit = async () => {
  await updateUserPassword(form.value.newPassword);
  $q.notify('비밀번호가 변경되었습니다.');
  form.value.newPassword = '';
  form.value.newPasswordConfirm = '';
};
</script>

<style lang="scss" scoped></style>
