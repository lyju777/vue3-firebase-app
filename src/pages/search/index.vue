<template>
  <q-page padding>
    <ais-instant-search :search-client="searchClient" index-name="dev_posts">
      <div class="row q-col-gutter-x-lg">
        <section class="col-3">
          <q-card flat bordered class="q-pa-md">
            <ais-panel>
              <template #header>카테고리</template>
              <template #default>
                <ais-refinement-list attribute="category" />
              </template>
            </ais-panel>
          </q-card>
          <q-card flat bordered class="q-pa-md q-mt-md">
            <ais-panel>
              <template #header>태그</template>
              <template #default>
                <ais-refinement-list attribute="tags" />
              </template>
            </ais-panel>
          </q-card>
        </section>
        <section class="col-9">
          <ais-search-box />
          <q-separator spaced />
          <ais-hits :transform-items="transformItems">
            <template v-slot="{ items }">
              <template v-for="item in items" :key="item.id">
                <PostItem :item="item" />
              </template>
            </template>
          </ais-hits>

          <div class="pagination flex flex-center q-mt-md">
            <ais-pagination></ais-pagination>
          </div>
        </section>
      </div>
    </ais-instant-search>
  </q-page>
</template>

<script setup>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import PostItem from 'src/components/apps/post/PostItem.vue';

const searchClient = algoliasearch(
  '0XXSJ1OXU8',
  'ecb14e42ffc4b2ab8faf6899e08632b7',
);

const transformItems = items => {
  return items.map(item => ({
    id: item.objectID,
    title: item.title,
    content: item._snippetResult.content.value,
    category: item.category,
    tags: item.tags,
    createdAt: item.createdAt,
    readCount: item.readCount,
    likeCount: item.likeCount,
    bookmarkCount: item.bookmarkCount,
    commentCount: item.commentCount,
    uid: item.uid,
  }));
};
</script>

<style lang="scss" scoped></style>
