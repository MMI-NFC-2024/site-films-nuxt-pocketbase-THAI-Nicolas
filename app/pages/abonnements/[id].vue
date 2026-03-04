<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;
const nuxtApp = useNuxtApp();
const abonnement = await nuxtApp.$pb.collection("abonnements").getOne(id);
import ImgPb from "~/components/ImgPb.vue";
</script>
<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-blue-900">Votre abonnement : {{ abonnement.nom }}</h1>
    <ImgPb
      :record="abonnement"
      :filename="abonnement.logo"
      alt="Logo de l'abonnement"
    />
  </div>
</template>
