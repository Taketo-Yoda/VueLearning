<template>
  <div class="menu">
    <h1>メニュー</h1>
    <ul>
      <li><NuxtLink to="/teams">チーム一覧・検索</NuxtLink></li>
      <li><NuxtLink to="/teams/new">チーム新規登録</NuxtLink></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.menu {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fafafa;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 1rem 0;
}
</style>
