import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export const usePostQuery = () => {
  const route = useRoute();
  const router = useRouter();

  const category = computed({
    get: () => route.query.category || '',
    set: val =>
      router.push({
        query: {
          ...route.query,
          category: val || undefined,
        },
      }),
  });

  const sort = computed({
    get: () => route.query.sort || 'createdAt',
    set: val => router.push({ query: { ...route.query, sort: val } }),
  });

  const tags = computed({
    get: () => route.query.tags?.split(',') || [],
    set: val =>
      router.push({
        query: {
          ...route.query,
          tags: val.length === 0 ? undefined : val.join(','),
        },
      }),
  });

  return {
    category,
    sort,
    tags,
  };
};
