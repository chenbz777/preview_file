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
  <iframe :src="`http://view.officeapps.live.com/op/view.aspx?src=${props.fileData.url}`" class="iframe_css" />
</template>

<style scoped>
.iframe_css {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>