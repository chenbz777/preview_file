<script setup>

const props = defineProps({
  fileData: {
    required: true,
    type: Object,
    default: () => { }
  }
});

</script>

<template>
  <img :src="props.fileData.url" class="w-100" />
</template>

<style scoped></style>