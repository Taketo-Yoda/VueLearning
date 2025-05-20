<template>
  <div class="team-new">
    <h1>チーム新規登録</h1>
    <form @submit.prevent="submit">
      <label>
        チーム名：
        <input v-model="name" required />
      </label>
      <button type="submit">登録</button>
      <NuxtLink to="/teams">一覧へ戻る</NuxtLink>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFetch } from '#app';

const name = ref('');
const message = ref('');
const router = useRouter();

const submit = async () => {
  if (!name.value) return;
  const { data, error } = await useFetch('/api/teams', {
    method: 'POST',
    body: { name: name.value },
  });
  if (error.value) {
    message.value = '登録に失敗しました';
  } else {
    message.value = '登録しました';
    setTimeout(() => router.push('/teams'), 1000);
  }
};
</script>

<style scoped>
.team-new {
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
