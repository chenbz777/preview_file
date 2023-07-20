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
  <div class="file__info">
    <div class="file__info__label">名称: {{ props.fileData.name }}</div>
    <div class="file__info__label">类型: {{ props.fileData.type }}</div>
    <div class="file__info__label">大小: {{ props.fileData.size }} kb</div>
    <div class="file__info__label">链接: {{ props.fileData.url }}</div>
  </div>
</template>

<style scoped>
.file__info {
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: #fff;
  /* border: 2px solid #e5e6e8; */
  border: 2px solid #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 #0000001a;
}

.file__info__label {
  border-radius: 20px;
  padding: 10px 20px;
  background: #f6f9fd;
  border: 1px solid #e5e6e8;
  word-break: break-all;
  white-space: pre-wrap;
  margin-bottom: 10px;
}
</style>