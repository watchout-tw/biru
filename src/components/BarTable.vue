<template>
  <div class="bar-table">
    <h1>I am bar title</h1>
    <table>
      <tr>
        <th colspan="1"></th>
        <th colspan="2">1</th>
        <th colspan="2">2</th>
        <th colspan="2">3</th>
        <th colspan="2">4</th>
        <th colspan="1"></th>
      </tr>
      <tr>
        <td colspan="2">張三</td>
        <td colspan="2" class="score"></td>
        <td colspan="2" class="score"></td>
        <td colspan="2" class="score"></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td colspan="2">李四</td>
        <td colspan="2" class="score"></td>
        <td colspan="2" class="no-score"></td>
        <td colspan="2" class="no-score"></td>
        <td colspan="2"></td>
      </tr>
    </table>
    <p>I am bar description</p>
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
.bar-table{
  table{
    width: 50%;
    margin: 0 auto;
  }
  th, td{
    margin: 5px;
    border-collapse: collapse;
    width: 14.285%;
  }
  .score{
    background-color: grey;
  }
  .no-score{
    background-color: silver;
  }
}
</style>
