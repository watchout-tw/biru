<template>
  <div id="app">
    <router-link class="home" :to="{name: 'ReportList'}">🏡</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-default/index.css';

$font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;

body {
  margin: 1rem;
}
#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
button {
  font-size: 1rem;
  font-family: $font-family;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
}
.buttons {
  margin: 1rem 0;
}
a {
  text-decoration: none;
  &:visited {
    color: blue;
  }
}
.home {
  font-size: 1.5rem;
}
</style>
