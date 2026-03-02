<script setup lang="ts">
import { nuxtCtx } from "nuxt/kit";
</script>

<template>
  <div>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/abonnements">Abonnements</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/calendrier">Calendrier</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/depenses">Dépenses</NuxtLink>
        </li>
      </ul>
    </nav>
    <slot />
  </div>
</template>
