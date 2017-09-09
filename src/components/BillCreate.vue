<template>
  <div class="report-create">
    <h1>👩‍🔬👨‍🔬</h1>
    <el-form ref="form" :model="form">
      <el-form-item label="Topic">
        <el-input placeholder="Topic" v-model="form.topic"></el-input>
      </el-form-item>
      <el-form-item label="Act">
        <el-input placeholder="Act" v-model="form.act"></el-input>
      </el-form-item>
      <el-form-item label="Act Features">
      </el-form-item>
      <el-form-item v-for="af in form.actFeatures" :key="index">
        <el-input placeholder="Lower vote threshold" v-model="af.feature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" icon="plus" @click="addActFeature">Add act feature</el-button>
      </el-form-item>
      <el-form-item label="Bill">
      </el-form-item>
      <el-form-item v-for="(bill, index) in form.bills" :key="index">
        <el-form-item :label="'Bill ' + (index + 1)"></el-form-item>
        <el-form-item label="Bill Name">
          <el-input placeholder="Bill Name" v-model="bill.name"></el-input>
        </el-form-item>
        <el-col :span="8">Short Content</el-col>
        <el-col :span="1"><div class="grid-content"></div></el-col>
        <el-col :span="8">Content</el-col>
        <el-col :span="1"><div class="grid-content"></div></el-col>
        <el-col :span="5">Score</el-col>
        <el-form-item v-for="baf in bill.act_features" :key="index">
          <el-form-item :label="baf.act_feature_title"></el-form-item>
          <el-col :span="8">
            <el-input v-model="baf.short_content"></el-input>
          </el-col>
          <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="8">
            <el-input v-model="baf.content"></el-input>
          </el-col>
          <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="5">
            <el-input-number v-model="baf.score" :min="1" :max="5"></el-input-number>
          </el-col>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="text" icon="plus" @click="addBill">Add bill</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="large" @click="submit">Create a dataReport</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as restful from '../util/restful'

export default {
  data () {
    return {
      form: {
        act: '',
        topic: '',
        actFeatures: [],
        bills: []
      }
    }
  },
  methods: {
    addActFeature () {
      this.form.actFeatures.push({
        feature: '',
        dir: ''
      })
    },
    addBill () {
      var tmpActFeature = []
      this.form.actFeatures.forEach(item => {
        tmpActFeature.push({
          act_feature_title: item.feature,
          short_content: '',
          content: ''
        })
      })
      this.form.bills.push({
        act_features: tmpActFeature
      })
    },
    submit () {
      var keyObj = restful.getBillDataKey()
      restful.postBillData(keyObj.ref, this.form).then(response => {
        this.$router.push({name: 'Report', params: { id: keyObj.key }})
      })
    }
  }
}
</script>

<style lang="scss">
.report-create {
  margin: 0 auto 4rem;
  max-width: 36rem;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
