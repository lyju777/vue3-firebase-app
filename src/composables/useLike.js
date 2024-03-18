import { readonly, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth';
import { addLike, hasLike, removeLike } from 'src/service';

export const useLike = (id, options) => {
  const { initialCount } = options || {};
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());

  const isLike = ref(false);
  const likeCount = ref(initialCount);
  const postId = ref(id);

  const initLick = async () => {
    if (isAuthenticated.value === false) {
      isLike.value = false;
      return;
    }
    isLike.value = await hasLike(uid.value, postId.value);
  };

  const toggleLike = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    if (isLike.value) {
      await removeLike(uid.value, postId.value);
      likeCount.value--;
    } else {
      await addLike(uid.value, postId.value);
      likeCount.value++;
    }
    isLike.value = !isLike.value;
  };

  watch(isAuthenticated, () => initLick(), { immediate: true });

  return {
    isLike,
    likeCount: readonly(likeCount),
    updateLickCount: count => (likeCount.value = count),
    toggleLike,
  };
};
