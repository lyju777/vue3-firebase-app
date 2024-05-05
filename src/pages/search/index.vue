<template>
  <q-page padding>
    <ais-instant-search :search-client="searchClient" index-name="dev_posts">
      <ais-configure :hits-per-page.camel="8" />
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
          <q-separator class="q-my-md" />

          <ais-hits :transform-items="transformItems">
            <template v-slot="{ items }">
              <PostList :items="items" />
            </template>
          </ais-hits>

          <div class="pagination flex flex-center q-mt-md">
            <ais-pagination />
          </div>
        </section>
      </div>
    </ais-instant-search>
  </q-page>
</template>

<script setup>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import PostList from 'src/components/apps/post/PostList.vue';
const searchClient = algoliasearch(
  'HWHYYT2AD2',
  'f688863368d338d6cf4e619c32c3097a',
);

const transformItems = items => {
  console.log('items: ', items);
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

<style lang="scss">
.ais-RefinementList-label {
  display: flex;
  align-items: center;
  width: 100%;
  text-transform: lowercase;
  cursor: pointer;
}
.ais-RefinementList-label > * {
  display: inline-block;
}
.ais-RefinementList-label > .ais-RefinementList-checkbox {
  margin-right: 6px;
}
.ais-RefinementList-label > .ais-RefinementList-labelText {
  flex-grow: 1;
}
.ais-RefinementList-label > .ais-RefinementList-count {
  padding: 0.01rem 0.4rem;
  border-radius: 50%;
}
</style>
