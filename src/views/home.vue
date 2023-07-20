<script setup>
import { useRoute } from 'vue-router';
import Welcome from './Welcome.vue';
import Preview from './preview/index.vue';

const route = useRoute();

const url = route.query.url ? decodeURIComponent(route.query.url) : '';
console.log('url: ', url);
</script>

<template>
  <div class="">
    <Welcome v-if="!url" />
    <Preview :url="url" v-else />
  </div>
</template>

<style scoped></style>
