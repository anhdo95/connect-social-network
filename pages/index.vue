<template>
  <div class="container">
    <Google />
  </div>
</template>

<script>
import Google from '@/components/Google'

export default {
  components: {
    Google
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  padding: 1rem;
}
</style>
