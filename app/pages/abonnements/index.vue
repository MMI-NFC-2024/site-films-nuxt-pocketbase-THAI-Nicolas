<script setup lang="ts">
import ImgPb from "~/components/ImgPb.vue";
const nuxtApp = useNuxtApp();
const { data: subscriptions } = await useAsyncData("subscriptions", () =>
  nuxtApp.$pb.collection("subscriptions").getFullList(),
);
</script>
<template>
  <h1 class="text-4xl text-center text-blue-900">Page abonnements</h1>
  <ul>
    <li
      v-for="subscription in subscriptions"
      :key="subscription.id"
      class="flex items-center justify-center"
    >
      <!-- <NuxtLink :to="`/abonnements/${abonnement.id}`">{{ -->
      <NuxtLink
        :to="{ name: 'abonnements-id', params: { id: subscription.id } }"
        >{{ subscription.name }}</NuxtLink
      >
      <ImgPb
        :record="subscription"
        :filename="subscription.logo"
        alt="Logo de l'abonnement"
      />
    </li>
  </ul>
</template>
