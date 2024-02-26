<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-4">
        <BaseCard>
          <q-list bordered separator>
            <q-item clickable v-ripple to="/mypage/profile">
              <q-item-section avatar>
                <q-icon name="sym_o_account_circle" />
              </q-item-section>
              <q-item-section>프로필</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/mypage/password">
              <q-item-section avatar>
                <q-icon name="sym_o_lock" />
              </q-item-section>
              <q-item-section>비밀번호 변경</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/mypage/bookmark">
              <q-item-section avatar>
                <q-icon name="sym_o_bookmark" />
              </q-item-section>
              <q-item-section>북마크</q-item-section>
            </q-item>
          </q-list>
        </BaseCard>
      </div>
      <div class="col-8">
        <router-view></router-view>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { RouterView } from 'vue-router';
import BaseCard from 'src/components/base/BaseCard.vue';
</script>

<style lang="scss" scoped></style>
