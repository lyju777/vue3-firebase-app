<template>
  <div v-if="code" class="text-red text-center">
    {{ errorMessage }}
  </div>
</template>

<!-- <script>
const ERROR_CODE_JSON = {
  'auth/invalid-email':
    'email 사용자 속성에 제공된 값이 잘못되었습니다. 이 값은 문자열 이메일 주소여야 합니다.',
};
</script> -->

<script setup>
import { computed } from 'vue';
import { getErrorMessage } from 'src/utils/firebase/error-message';

const props = defineProps({
  code: {
    type: String,
  },
});

const errorMessage = computed(() => getErrorMessage(props.code));
</script>

<style lang="scss" scoped></style>
