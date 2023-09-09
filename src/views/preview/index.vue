<script setup>
import { reactive, onMounted, defineAsyncComponent } from 'vue';
import axios from 'axios';

import FileInfo from './FileInfo.vue';

// const office = defineAsyncComponent(() => import('./PreviewOffice.vue'));
const docx = defineAsyncComponent(() => import('./PreviewDocx.vue'));
const xlsx = defineAsyncComponent(() => import('./PreviewXlsx.vue'));
const pdf = defineAsyncComponent(() => import('./PreviewPdf.vue'));
const img = defineAsyncComponent(() => import('./PreviewImg.vue'));
const txt = defineAsyncComponent(() => import('./PreviewTxt.vue'));

const props = defineProps({
  url: {
    required: true,
    type: String,
    default: ''
  }
});

const componentName = {
  docx,
  xlsx,
  // pptx: office,
  pdf,
  img,
  txt
};

const fileData = reactive({
  name: '',
  type: '',
  size: 0,
  blob: null,
  url: ''
});

const getFileType = (fileName) => {

  const imgList = ['png', 'jpg', 'jpeg', 'gif'];

  if (imgList.find(item => fileName.indexOf(item) !== -1)) {
    return 'img';
  }

  if (fileName.indexOf('docx') !== -1) {
    return 'docx';
  }

  if (fileName.indexOf('xlsx') !== -1) {
    return 'xlsx';
  }

  if (fileName.indexOf('pdf') !== -1) {
    return 'pdf';
  }

  if (fileName.indexOf('pptx') !== -1) {
    return 'pptx';
  }

  const textList = ['txt', 'java', 'php', 'py', 'md', 'js', 'css'];

  if (textList.find(item => fileName.indexOf(item) !== -1)) {
    return 'txt';
  }
};

const isPc = () => {
  if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return false; // 移动端
  } else {
    return true; // PC端
  }
};

onMounted(async () => {

  const res = await axios.get(props.url, {}, { responseType: 'blob' });
  console.log('res: ', res);

  const file = res.data;

  // const fileType = res.headers['content-type'];

  const fileSize = res.headers['content-length'];

  const fileNameArr = props.url.split('/');

  const fileName = fileNameArr[fileNameArr.length - 1];

  fileData.url = props.url;
  fileData.name = fileName;
  fileData.size = parseInt(fileSize / 1000);
  fileData.type = getFileType(fileName);
  fileData.blob = file;

  console.log('fileData: ', fileData);

});

const back = () => [
  window.history.back()
];
</script>

<template>
  <div class="preview">
    <template v-if="isPc()">
      <div class="preview__content">
        <component :is="componentName[fileData.type]" :fileData="fileData" v-if="componentName[fileData.type]" />

        <div v-else class="no-file">暂不支持预览该类型</div>
      </div>

      <FileInfo :fileData="fileData" class="preview__info" />
    </template>

    <template v-else>
      <div class="preview__head">
        <div class="preview__head__btn preview__head__btn--active" @click="back()">返回</div>
        <div class="preview__head__btn">{{ fileData.type }}</div>
      </div>
      <div class="preview__content preview__content--h5">

        <component :is="componentName[fileData.type]" :fileData="fileData" v-if="componentName[fileData.type]" />

        <div v-else class="no-file">暂不支持预览该类型</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.preview {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
}

.preview__content {
  flex: 1;
  height: calc(100% - 48.5px);
  overflow-x: auto;
  overflow-y: auto;
  margin-right: 15px;
  border-radius: 8px;
  border: 2px solid #fff;
  transition: all 0.5s;
}

.preview__content:empty {
  display: flex;
  align-content: center;
  justify-items: center;
}

.preview__content--h5 {
  margin: 0;
}

.preview__info {
  width: 300px;
}

.no-file {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
}

.preview__head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.preview__head__btn {
  padding: 6px 10px;
  border-radius: 8px;
  border: 2px solid #fff;
  border-radius: 8px;
  cursor: pointer;
}

.preview__head__btn--active {
  box-shadow: 0 4px 16px 0 #0000001a;
}
</style>