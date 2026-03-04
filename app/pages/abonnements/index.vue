<script setup lang="ts">
const nuxtApp = useNuxtApp();
const abonnements = await nuxtApp.$pb.collection("abonnements").getFullList();
import ImgPb from "~/components/ImgPb.vue";
</script>
<template>
  <h1 class="text-4xl text-center text-blue-900">Page abonnements</h1>
  <ul>
    <li
      v-for="abonnement in abonnements"
      :key="abonnement.id"
      class="flex items-center justify-center"
    >
      <!-- <NuxtLink :to="`/abonnements/${abonnement.id}`">{{ -->
      <NuxtLink
        :to="{ name: 'abonnements-id', params: { id: abonnement.id } }"
        >{{ abonnement.nom }}</NuxtLink
      >
      <ImgPb
        :record="abonnement"
        :filename="abonnement.logo"
        alt="Logo de l'abonnement"
      />
    </li>
  </ul>
</template>
