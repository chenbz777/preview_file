<script setup>
// import { ref, reactive } from 'vue';

</script>

<template>
  <div class="welcome">
    <div>
      <div class="welcome__title">文件预览系统</div>
      <!-- <div class="mt-3">
        <ul>
          <li>办公文档: docx、xlsx、pdf</li>
          <li>纯文本: txt、java、php、py、md、js、css</li>
          <li>图片: jpg、jpeg、png、gif</li>
        </ul>
      </div>
      <div class="mt-3">
        使用方法:
        <div>
          const url = 'http://test.com?url=' + encodeURIComponent('文件url');
        </div>
        <div>
          window.location.href = url
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.welcome {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome__title {
  font-size: 30px;
  font-weight: 600;
}
</style>