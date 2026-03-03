<script setup lang="ts">
const nuxtApp = useNuxtApp();
const abonnements = await nuxtApp.$pb.collection("abonnements").getFullList();
</script>
<template>
  <h1 class="text-4xl text-blue-900">Page abonnements</h1>
  <ul>
    <li v-for="abonnement in abonnements">{{ abonnement.nom }}</li>
  </ul>
</template>
