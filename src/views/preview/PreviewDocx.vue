<script setup>
import VueOfficeDocx from '@vue-office/docx';
import '@vue-office/docx/lib/index.css';

const props = defineProps({
  fileData: {
    required: true,
    type: Object,
    default: () => { }
  }
});

</script>

<template>
  <vue-office-docx :src="props.fileData.url" class="w-100 h-100" />
</template>

<style scoped></style>