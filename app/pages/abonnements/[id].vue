<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;
const nuxtApp = useNuxtApp();
const subscription = await nuxtApp.$pb.collection("subscriptions").getOne(id);
import ImgPb from "~/components/ImgPb.vue";
</script>
<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-blue-900">Votre subscription : {{ subscription.name }}</h1>
    <ImgPb
      :record="subscription"
      :filename="subscription.logo"
      alt="Logo de l'abonnement"
    />
    <NuxtLink
      :to="`/abonnements/edit/${id}`"
      class="text-blue-500 hover:underline"
    >
      Modifier l'abonnement
    </NuxtLink>
  </div>
</template>
