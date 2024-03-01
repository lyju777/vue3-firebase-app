<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="val => $emit('update:modelValue', val)"
    transition-show="none"
    transition-hide="none"
    @hide="changeViewMode('SignInForm')"
  >
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space></q-space>
        <q-btn icon="close" flat round dense v-close-popup></q-btn>
      </q-card-section>
      <q-card-section class="q-px-xl q-pb-xl">
        <!-- v-if를 활용한 조건부 렌더링 -->
        <!-- <SignInForm
          v-if="viewMode === 'SignInForm'"
          @changeView="changeViewMode"
        />
        <SignUpForm
          v-else-if="viewMode === 'SignUpForm'"
          @changeView="changeViewMode"
        />
        <FindPasswordForm v-else @changeView="changeViewMode" /> -->

        <!-- 동적 컴포넌트 -->
        <component
          :is="authViewComponents[viewMode]"
          @changeView="changeViewMode"
          @close-dialog="closeDialog"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import SignInForm from './SignInForm.vue';
import SignUpForm from './SignUpForm.vue';
import FindPasswordForm from './FindPasswordForm.vue';

import { ref, defineAsyncComponent } from 'vue';

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const viewMode = ref('SignInForm');
const changeViewMode = mode => (viewMode.value = mode);

// const authViewComponent = {
//   SignInForm,
//   SignUpForm,
//   FindPasswordForm,
// };

const authViewComponents = {
  SignInForm: defineAsyncComponent(() => import('./SignInForm.vue')),
  SignUpForm: defineAsyncComponent(() => import('./SignUpForm.vue')),
  FindPasswordForm: defineAsyncComponent(() =>
    import('./FindPasswordForm.vue'),
  ),
};

const closeDialog = () => {
  emit('update:modelValue', false);
};
</script>

<style lang="scss" scoped></style>
