<script setup lang="ts">
import type {
  CategoriesResponse,
  SubscriptionsRecord,
  SubscriptionsBillingCycleOptions,
} from "~/utils/types";

const { $pb } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const id = computed(() => route.params.id as string | undefined);
const isEditing = computed(() => !!id.value);

const categories = ref<CategoriesResponse[]>([]);
const error = ref<string | null>(null);
const loading = ref(false);

const form = ref<Partial<SubscriptionsRecord>>({
  name: "",
  price: 0,
  currency: "EUR",
  billing_cycle: "monthly" as SubscriptionsBillingCycleOptions,
  started_at: new Date().toISOString().split("T")[0],
  is_active: true,
  description: "",
  category: "",
});

// Charger les catégories
categories.value = await $pb.collection("categories").getFullList({
  sort: "name",
});

// Pré-remplir si édition
if (isEditing.value) {
  const record = await $pb.collection("subscriptions").getOne(id.value!);
  form.value = {
    name: record.name,
    price: record.price,
    currency: record.currency,
    billing_cycle: record.billing_cycle,
    started_at: record.started_at?.split(" ")[0],
    is_active: record.is_active,
    description: record.description,
    category: record.category,
  };
}

async function handleSubmit() {
  loading.value = true;
  error.value = null;
  try {
    if (isEditing.value) {
      await $pb.collection("subscriptions").update(id.value!, form.value);
    } else {
      await $pb.collection("subscriptions").create(form.value);
    }
    router.push("/abonnements");
  } catch (e: any) {
    error.value = e?.message ?? "Une erreur est survenue.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">
      {{ isEditing ? "Modifier l'abonnement" : "Nouvel abonnement" }}
    </h1>

    <p v-if="error" class="mb-4 text-red-500 text-sm">{{ error }}</p>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <!-- Nom -->
      <label class="flex flex-col gap-1 text-sm font-medium">
        Nom *
        <input
          v-model="form.name"
          type="text"
          required
          placeholder="Ex : Netflix"
          class="border rounded px-3 py-2 text-sm"
        />
      </label>

      <!-- Prix + Devise -->
      <div class="flex gap-3">
        <label class="flex flex-col gap-1 text-sm font-medium flex-1">
          Prix *
          <input
            v-model.number="form.price"
            type="number"
            step="0.01"
            min="0"
            required
            placeholder="0.00"
            class="border rounded px-3 py-2 text-sm"
          />
        </label>
        <label class="flex flex-col gap-1 text-sm font-medium w-24">
          Devise
          <input
            v-model="form.currency"
            type="text"
            maxlength="3"
            placeholder="EUR"
            class="border rounded px-3 py-2 text-sm"
          />
        </label>
      </div>

      <!-- Cycle de facturation -->
      <label class="flex flex-col gap-1 text-sm font-medium">
        Cycle de facturation
        <select
          v-model="form.billing_cycle"
          class="border rounded px-3 py-2 text-sm"
        >
          <option value="monthly">Mensuel</option>
          <option value="yearly">Annuel</option>
          <option value="weekly">Hebdomadaire</option>
        </select>
      </label>

      <!-- Date de début -->
      <label class="flex flex-col gap-1 text-sm font-medium">
        Date de début *
        <input
          v-model="form.started_at"
          type="date"
          required
          class="border rounded px-3 py-2 text-sm"
        />
      </label>

      <!-- Catégorie -->
      <label class="flex flex-col gap-1 text-sm font-medium">
        Catégorie
        <select
          v-model="form.category"
          class="border rounded px-3 py-2 text-sm"
        >
          <option value="">-- Aucune --</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </label>

      <!-- Description -->
      <label class="flex flex-col gap-1 text-sm font-medium">
        Description
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Description optionnelle..."
          class="border rounded px-3 py-2 text-sm resize-none"
        />
      </label>

      <!-- Actif -->
      <label class="flex items-center gap-2 text-sm font-medium cursor-pointer">
        <input v-model="form.is_active" type="checkbox" class="w-4 h-4" />
        Abonnement actif
      </label>

      <!-- Actions -->
      <div class="flex gap-3 mt-2">
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        >
          {{
            loading
              ? "Enregistrement..."
              : isEditing
                ? "Mettre à jour"
                : "Créer"
          }}
        </button>
        <NuxtLink
          to="/abonnements"
          class="flex-1 text-center border rounded py-2 px-4 text-sm hover:bg-gray-50"
        >
          Annuler
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
