<script setup>
import { reactive, onMounted, defineAsyncComponent } from 'vue';
import axios from 'axios';

import FileInfo from './fileInfo.vue';

const office = defineAsyncComponent(() => import('./PreviewOffice.vue'));
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
  docx: office,
  xlsx: office,
  pptx: office,
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

// const getFileType = (fileType) => {
//   if (fileType.indexOf('png') !== -1) {
//     return 'img';
//   }

//   if (fileType.indexOf('jpeg') !== -1) {
//     return 'img';
//   }

//   if (fileType.indexOf('jpg') !== -1) {
//     return 'img';
//   }

//   if (fileType.indexOf('gif') !== -1) {
//     return 'img';
//   }

//   // doc暂时没有支持方案
//   if (fileType.indexOf('application/msword') !== -1) {
//     return 'doc';
//   }

//   if (fileType.indexOf('application/vnd.openxmlformats-officedocument.wordprocessingml.document') !== -1) {
//     return 'docx';
//   }

//   if (fileType.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') !== -1) {
//     return 'xlsx';
//   }

//   if (fileType.indexOf('application/pdf') !== -1) {
//     return 'pdf';
//   }

//   if (fileType.indexOf('application/vnd.openxmlformats-officedocument.presentationml.presentation') !== -1) {
//     return 'pptx';
//   }

//   if (fileType.indexOf('text/plain') !== -1) {
//     return 'txt';
//   }
// };

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
  console.log('file: ', file);

  const fileType = res.headers['content-type'];
  console.log('fileType: ', fileType);

  const fileSize = res.headers['content-length'];
  console.log('fileSize: ', fileSize);

  const fileNameArr = props.url.split('/');

  const fileName = fileNameArr[fileNameArr.length - 1];
  console.log('fileName: ', fileName);

  fileData.url = props.url;
  fileData.name = fileName;
  fileData.size = parseInt(fileSize / 1000);
  fileData.type = getFileType(fileName);
  fileData.blob = file;
  console.log('fileData: ', fileData);

});
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
  padding: 15px;
}

.preview__content {
  flex: 1;
  height: 100%;
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
</style>