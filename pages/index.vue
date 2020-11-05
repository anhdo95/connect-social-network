<template>
  <div class="container">
    <Google />
    <Facebook />
    <GooglePlaces />
  </div>
</template>

<script>
import Google from '@/components/Google'
import Facebook from '@/components/Facebook'
import GooglePlaces from '@/components/GooglePlaces'

export default {
  components: {
    Google,
    Facebook,
    GooglePlaces
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  padding: 1rem;

  & > * {
    padding: 1rem 0;
    border-bottom: 1px solid #888;
  }
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #f2f2f2;
  border: none;
  border-radius: 100px;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: darken(#f2f2f2, 10%);
  }

  &__icon,
  &__text {
    vertical-align: middle;
  }

  &__icon {
    width: 18px;
    height: 18px;
    margin-right: 0.5rem;
  }
}
</style>
