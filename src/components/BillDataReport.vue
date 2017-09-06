<template>
  <div class="bill-data-report">
    <figure-a></figure-a>
    <figure-b></figure-b>
  </div>
</template>

<script>
import FigureA from '@/components/FigureA'
import FigureB from '@/components/FigureB'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    FigureA,
    FigureB
  }
}
</script>

<style lang="scss">

</style>
