<template>
<div>
    <Row>
        <Col span="6" v-for="item in data2" :key="item.id"><div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">{{ item.申请单号 }}－－－{{ item.迈景编号 }}</p>
            <p><b>流转开始日期</b>: {{ item.流转开始日期 }}</p>
            <p><b>预计报告完成日期</b>: {{ item.预计完成时间 }}</p>
            <p><b>当前状态:</b> {{ item.状态 }}</p>
            <Progress :percent="dates(item)" status="active" />
        </Card>
    </div></Col>
    </Row>
</div>
</template>
<script>
export default {
  data () {
    return {
      data2: [],
      targetKeys3: [],
      listStyle: {
        width: '600px',
        height: '400px'
      }
    }
  },
  computed: {
    data3 () { return this.getData() }
    // targetKeys3 () { return [] }
  },
  methods: {
    getApiData () {
      this.loading = true
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/flowing/'
      this.axios
        .get(path)
        .then(response => {
          this.data2 = response.data.data
          this.filter_mg = response.data.filter_mg
          this.loading = false
          console.log('成功')
          console.log(response.data.data_b)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getData () {
      let data1 = []
      for (let i = 0; i < this.data2.length; i++) {
        data1.push({
          key: i + 1,
          label: this.data2[i]['迈景编号']
        })
      }
      console.log(data1)
      return data1
    },
    showData () {
      console.log(this.data3)
    },
    handleChange3 (newTargetKeys) {
      console.log(newTargetKeys)
      this.targetKeys3 = newTargetKeys
    },
    render3 (item) {
      return item.label
    },
    calDays (date, days) {
      // date eg:'2019.07.31'(str) days: 9(int)
      let s1 = date
      s1 = new Date(Date.parse(s1.replace(/\./g, '/')))
      let s2 = new Date()// 当前日期：2017-04-24
      let day = s2.getTime() - s1.getTime()
      let time = parseInt(day / (1000 * 60 * 60 * 24))
      if (days - time > 0) {
        return days - time
      } else {
        return 0
      }
    },
    calDays1 (date1, date2) {
      // date eg:'2019.07.31'(str) days: 9(int)
      let s1 = date1
      s1 = new Date(Date.parse(s1.replace(/\./g, '/')))
      let s2 = date2
      s2 = new Date(Date.parse(s2.replace(/\./g, '/')))
      let day = s2.getTime() - s1.getTime()
      let time = parseInt(day / (1000 * 60 * 60 * 24))
      return time
    },
    dates (item) {
      return parseInt((-this.calDays(item.流转开始日期, 0) / this.calDays1(item.流转开始日期, item.预计完成时间)) * 100)
    }
  },
  mounted () {
    this.getApiData()
  }
}
</script>
