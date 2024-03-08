import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  // const user = ref(null);
  const user = useLocalStorage('auth/user', null, {
    serializer: StorageSerializers.object,
  });
  const isAuthenticated = computed(() => !!user.value);
  const uid = computed(() => user.value?.uid || null);

  const setUser = userData => {
    user.value = userData;
    if (userData) {
      user.value = {
        uid: userData.uid,
        photoURL: userData.photoURL,
        displayName: userData.displayName,
        email: userData.email,
        emailVerified: userData.emailVerified,
      };
    } else {
      user.value = null;
    }
  };
  return {
    user,
    uid,
    isAuthenticated,
    setUser,
  };
});
