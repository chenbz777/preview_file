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
  <pre class="m-0 p-3 preview__txt">{{ props.fileData.blob }}</pre>
</template>

<style scoped>
.preview__txt {
  font-size: 16px;
}
</style>