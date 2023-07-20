<script setup>
import VueOfficePdf from '@vue-office/pdf';

const props = defineProps({
  fileData: {
    required: true,
    type: Object,
    default: () => { }
  }
});

</script>

<template>
  <vue-office-pdf :src="props.fileData.url" class="w-100 h-100" />
</template>

<style scoped></style>