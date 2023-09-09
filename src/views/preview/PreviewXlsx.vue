<script setup>
import VueOfficeExcel from '@vue-office/excel';
import '@vue-office/excel/lib/index.css';

const props = defineProps({
  fileData: {
    required: true,
    type: Object,
    default: () => { }
  }
});

</script>

<template>
  <vue-office-excel :src="props.fileData.url" class="w-100 h-100" />
</template>

<style scoped></style>