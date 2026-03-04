<script setup lang="ts">
const props = defineProps<{
  /** L'enregistrement 'complet' (id et collectionId ou collectionName) de PocketBase */
  record: BaseSystemFields;
  /** La valeur du nom de fichier stocké dans la colonne de PocketBase */
  filename: string;
  /** Texte alternatif pour l'accessibilité */
  alt?: string;
  /** La largeur aussi utilisée pour fixer la largeur d'image demandée à PocketBase */
  width?: number | string;
  /** La hauteur aussi utilisée pour fixer la hauteur d'image demandée à PocketBase */
  height?: number | string;
  /** Pour fixer manuellement les paramétres de redimensionnement de PocketBase
   * https://pocketbase.io/docs/files-handling/#file-url
   */
  thumb?: string;
  /** Classe CSS appliquée au conteneur <div> */
  classPicture?: string;
  /** Classe CSS appliquée à la balise <img> */
  classImg?: string;
}>();

const nuxtApp = useNuxtApp();
const src = props.filename
  ? nuxtApp.$pb.files.getURL(props.record, props.filename, {
      thumb: props.thumb || `${props.width ?? 0}x${props.height ?? 0}`,
    })
  : null;
</script>
<template>
  <div v-if="src" :class="classPicture">
    <img
      :src="src"
      :width="width"
      :height="height"
      :alt="alt || 'Image'"
      :class="classImg"
    />
  </div>
  <div
    v-else
    :class="[
      classPicture,
      'w-full h-full flex items-center justify-center bg-gray-200',
    ]"
  >
    <span class="text-gray-500">Image non disponible</span>
  </div>
</template>
