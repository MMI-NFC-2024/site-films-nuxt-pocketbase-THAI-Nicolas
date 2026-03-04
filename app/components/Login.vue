<script setup lang="ts">
const nuxtApp = useNuxtApp();
const user = nuxtApp.$user;
async function LoginWithGithub() {
  const authData = await nuxtApp.$pb
    .collection("users")
    .authWithOAuth2({ provider: "github" });
  console.log("User authenticated:", authData);
}
</script>
<template>
  <button v-if="user" @click="nuxtApp.$pb.authStore.clear()">
    Se déconnecter {{ user?.name || user?.email }}
  </button>
  <button v-else @click="LoginWithGithub">Se connecter avec Github</button>
</template>
