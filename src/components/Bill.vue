<template>
  <div class="report-create">
    <h1>👩‍🔬👨‍🔬</h1>
    <el-form ref="form" :model="form">
      <h3>Topic</h3>
      <el-form-item label="A public topic related to certain act">
        <el-input placeholder="Eg. Marriage Equality" v-model="form.topic"></el-input>
      </el-form-item>
      <h3>Features</h3>
      <el-form-item label="Features that use to compare between acts">
      </el-form-item>
      <el-form-item v-for="af in form.actFeatures" :key="index">
        <el-input placeholder="Eg: Allowing adoption?" v-model="af.feature"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" icon="plus" @click="addActFeature">Add more feature</el-button>
      </el-form-item>
      <h3>Acts to be compare</h3>
      <el-form-item label="Specific acts in different country">
      </el-form-item>
      <el-form-item v-for="(bill, index) in form.bills" :key="index">
        <el-form-item label="Act in Country">
          <el-input placeholder="Eg: Act of marriage equality in Taiwan" v-model="bill.name"></el-input>
        </el-form-item>
        <h5>Features of act</h5>
        <el-col :span="8">Short Content</el-col>
        <el-col :span="1"><div class="grid-content"></div></el-col>
        <el-col :span="8">Content</el-col>
        <el-col :span="1"><div class="grid-content"></div></el-col>
        <el-col :span="5">Score</el-col>
        <el-form-item v-for="baf in bill.act_features" :key="index">
          <el-form-item :label="baf.act_feature_title"></el-form-item>
          <el-col :span="8">
            <el-input placeholder="Allowed" v-model="baf.short_content"></el-input>
          </el-col>
          <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="8">
            <el-input placeholder="Adoption is allowed for any legal couple" type="textarea" v-model="baf.content"></el-input>
          </el-col>
          <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="5">
            <el-tooltip class="item" effect="light" content="Score this feature from 1 to 5" placement="top-start">
              <el-input-number v-model="baf.score" :min="1" :max="5"></el-input-number>
            </el-tooltip>
          </el-col>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="text" icon="plus" @click="addBill">Add more act</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isNew" type="primary" size="large" @click="submit">Create a dataReport</el-button>
        <el-button v-else type="primary" size="large" @click="submit">Submit dataReport</el-button>
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
      },
      isNew: this.$route.params.id === '0'
    }
  },
  beforeMount () {
    if (this.$route.params.id !== '0') {
      restful.getDataReport(this.$route.params.id).then(snapshot => {
        var data = snapshot.val()
        this.form = Object.assign({}, this.form, data)
      })
    }
  },
  methods: {
    addActFeature () {
      this.form.actFeatures.push({
        feature: '',
        dir: ''
      })
      this.form.bills.forEach(bill => {
        bill.act_features.push({
          act_feature_title: bill.act_features[0].act_feature_title,
          short_content: '',
          content: '',
          score: 0
        })
      })
    },
    addBill () {
      if (this.form.actFeatures.length < 3) {
        alert('Oops! At least 3 features are needed.')
        return
      }
      var tmpActFeature = []
      this.form.actFeatures.forEach(item => {
        tmpActFeature.push({
          act_feature_title: item.feature,
          short_content: '',
          content: '',
          score: 0
        })
      })
      this.form.bills.push({
        name: '',
        act_features: tmpActFeature
      })
    },
    submit () {
      if (this.$route.params.id !== '0') {
        restful.postBillDataByKey(this.$route.params.id, this.form).then(response => {
          this.$router.push({name: 'Report', params: { id: this.$route.params.id }})
        })
      } else {
        var keyObj = restful.getBillDataKey()
        restful.postBillData(keyObj.ref, this.form).then(response => {
          this.$router.push({name: 'Report', params: { id: keyObj.key }})
        })
      }
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
