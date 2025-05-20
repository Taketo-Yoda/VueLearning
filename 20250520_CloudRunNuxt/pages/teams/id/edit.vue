<template>
  <div class="team-edit">
    <h1>チーム編集</h1>
    <form v-if="loaded" @submit.prevent="submit">
      <label>
        チーム名：
        <input v-model="teamName" required />
      </label>
      <button type="submit">更新</button>
      <NuxtLink to="/teams">一覧へ戻る</NuxtLink>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
    <div v-if="!loaded">読み込み中...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFetch } from '#app';


const route = useRoute();
const router = useRouter();
// クエリパラメータからidを取得（/teams/id/edit?id=xxx 形式対応）
const id = (route.query.id || route.params.id) as string;
const teamName = ref('');
const loaded = ref(false);
const message = ref('');

onMounted(async () => {
  if (!id) {
    message.value = 'IDが取得できません';
    return;
  }
  const { data, error } = await useFetch(`/api/teams/id?id=${id}`);
  if (data.value) {
    teamName.value = data.value.name;
    loaded.value = true;
  } else {
    message.value = 'データ取得に失敗しました';
  }
});

const submit = async () => {
  if (!id) {
    message.value = 'IDが取得できません';
    return;
  }
  const { error } = await useFetch(`/api/teams/id?id=${id}`, {
    method: 'PUT',
    body: { name: teamName.value },
  });
  if (error.value) {
    message.value = '更新に失敗しました';
  } else {
    message.value = '更新しました';
    setTimeout(() => router.push('/teams'), 1000);
  }
};
</script>

<style scoped>
.team-edit {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.message {
  margin-top: 1rem;
  color: green;
}
</style>
