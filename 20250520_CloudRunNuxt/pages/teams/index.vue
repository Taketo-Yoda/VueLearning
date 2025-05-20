<template>
  <div class="teams-list">
    <h1>チーム一覧・検索</h1>
    <form @submit.prevent="fetchTeams">
      <input v-model="searchName" placeholder="チーム名で検索" />
      <button type="submit">検索</button>
      <NuxtLink to="/teams/new" class="new-link">新規登録</NuxtLink>
    </form>
    <table v-if="teams.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>チーム名</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="team in teams" :key="team.id">
          <td>{{ team.id }}</td>
          <td>{{ team.name }}</td>
          <td>
            <NuxtLink :to="`/teams/id/edit?id=${team.id}`">編集</NuxtLink>
            <button @click="deleteTeam(team.id)" class="delete-btn">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>データがありません</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';

const teams = ref<{ id: string; name: string }[]>([]);
const searchName = ref('');

const fetchTeams = async () => {
  const { data } = await useFetch('/api/teams', {
    params: searchName.value ? { name: searchName.value } : undefined,
  });
  teams.value = data.value as any[] || [];
};

const deleteTeam = async (id: string) => {
  if (!confirm('本当に削除しますか？')) return;
  await useFetch('/api/teams/id?id=' + id, {
    method: 'DELETE',
    body: { id },
  });
  fetchTeams();
};

onMounted(fetchTeams);
</script>

<style scoped>
.teams-list {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
}
form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.new-link {
  margin-left: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  text-align: left;
}
.delete-btn {
  color: #fff;
  background: #e74c3c;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  cursor: pointer;
}
</style>
