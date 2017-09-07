<template>
  <div class="comparison-table">
    <h1>I am title</h1>
    <table>
      <tr>
        <th>name/item</th>
        <th>item</th>
      </tr>
      <tr>
        <td>Five Wang</td>
        <td>100%</td>
      </tr>
    </table>
    <p>I am description</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
.comparison-table{
  table, th, td{
    border: 1px solid black;
    border-collapse: collapse;
    padding: 5px;
    margin: 0 auto;
  }
}
</style>
