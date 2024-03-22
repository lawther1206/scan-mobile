<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getUser } from '@/api/api'
import { onMounted } from 'vue'
onMounted(async () => {})
</script>

<style scoped></style>
