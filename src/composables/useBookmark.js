import { readonly, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth';
import { addBookmark, hasBookmark, removeBookmark } from 'src/service';

export const useBookmark = (id, options) => {
  const { initialCount } = options || {};
  const { uid, isAuthenticated } = storeToRefs(useAuthStore());

  const isBookmark = ref(false);
  const bookmarkCount = ref(initialCount);
  const postId = ref(id);

  const initLick = async () => {
    if (isAuthenticated.value === false) {
      isBookmark.value = false;
      return;
    }
    isBookmark.value = await hasBookmark(uid.value, postId.value);
  };

  const toggleBookmark = async () => {
    if (isAuthenticated.value === false) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    if (isBookmark.value) {
      await removeBookmark(uid.value, postId.value);
      bookmarkCount.value--;
    } else {
      await addBookmark(uid.value, postId.value);
      bookmarkCount.value++;
    }
    isBookmark.value = !isBookmark.value;
  };

  watch(isAuthenticated, () => initLick(), { immediate: true });

  return {
    isBookmark,
    bookmarkCount: readonly(bookmarkCount),
    updateLickCount: count => (bookmarkCount.value = count),
    toggleBookmark,
  };
};
