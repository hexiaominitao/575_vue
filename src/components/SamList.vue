<template>
  <div>
            <Button type="primary" @click="getApiData"
            >刷新</Button>
            <Button type="primary" @click="exportData"
            >导出</Button>
            <!-- <div id="input-search"><Input search
     autofocus
     placeholder="输入样本编号" /></div> -->
    <Table stripe
    :columns="columns"
           :loading="loading"
           height="600"
           :data="data"
           size="small"
           @on-selection-change='delVal'
           ref="table"></Table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'SamList',
  data () {
    return {
      hostIP: 'http://' + this.$store.state.hostIp,
      filter_mg: [],
      edit_stat: false,
      input_value: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          'fixed': 'left'
        },
        {
          'title': '状态',
          'key': '状态',
          'width': 120,
          'sortable': true
        },
        {
          'title': '患者姓名',
          'key': '患者姓名',
          'width': 120,
          'sortable': true
        },
        {
          'title': '检测项目',
          'key': '检测项目',
          'width': 120,
          'sortable': true
        },
        {
          'title': '肿瘤',
          'key': '病理诊断',
          'width': 120,
          'sortable': true
        },
        {
          'title': '申请单号',
          'key': '申请单号',
          'width': 150,
          'sortable': true,
          'fixed': 'left'
        },
        {
          'title': '迈景编号',
          'key': '迈景编号',
          'width': 120,
          'sortable': true,
          'fixed': 'left'
        },
        {
          'title': '样本类型',
          'key': '样本类型',
          'width': 120,
          'sortable': true
        },
        {
          'title': '收样日期',
          'key': '收样日期',
          'width': 120,
          'sortable': true
        },
        {
          'title': '流转开始日期',
          'key': '流转开始日期',
          'width': 150,
          'sortable': true
        },
        {
          'title': '提取完成日期',
          'key': '提取完成日期',
          'width': 150,
          'sortable': true
        },
        {
          'title': '建库完成日期',
          'key': '建库完成日期',
          'width': 150,
          'sortable': true
        },
        {
          'title': '实际上机日期',
          'key': '实际上机日期',
          'width': 150,
          'sortable': true
        },
        {
          'title': '上机倒计时',
          'key': '上机倒计时',
          'width': 150,
          'sortable': true,
          render: (h, params) => {
            return h('div',
              this.calDays(params.row.流转开始日期, 4) + '天')
          }
        },
        {
          'title': '测序完成日期',
          'key': '测序完成日期',
          'width': 150,
          'sortable': true
        },
        {
          'title': '生信完成日期',
          'key': '生信完成日期',
          'width': 150,
          'sortable': true
        },
        {
          'title': '生信倒计时',
          'key': '生信倒计时',
          'width': 150,
          'sortable': true,
          render: (h, params) => {
            let day = 0
            if (params.row.type === 'b') {
              day = 11
            } else {
              day = 9
            }
            return h('div',
              this.calDays(params.row.流转开始日期, day) + '天')
          }
        },
        {
          'title': '报告完成时间',
          'key': '报告完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '报告倒计时',
          'key': '报告倒计时',
          'width': 150,
          'sortable': true,
          render: (h, params) => {
            let day = 0
            if (params.row.type === 'b') {
              day = 13
            } else {
              day = 10
            }
            return h('div',
              this.calDays(params.row.流转开始日期, day) + '天')
          }
        },
        {
          'title': '审核完成时间',
          'key': '审核完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '审核倒计时',
          'key': '审核倒计时',
          'width': 150,
          'sortable': true,
          render: (h, params) => {
            let day = 0
            if (params.row.type === 'b') {
              day = 14
            } else {
              day = 11
            }
            return h('div',
              this.calDays(params.row.流转开始日期, day) + '天')
          }
        },
        {
          'title': '备注',
          'key': '备注',
          'width': 120,
          'sortable': true
        },
        {
          'title': '预计完成时间',
          'key': '预计完成时间',
          'width': 150,
          'fixed': 'right',
          'sortable': true,
          'sortType': 'desc'
        }
      ],
      data: [],
      my_selection: '',
      loading: false
    }
  },
  computed: {
    list_s () {
      return this.$store.state.list_select
    },
    filename () {
      let day = new Date()
      return day.getFullYear() + '_' + (day.getMonth() + 1) + '_' + day.getDate() + '_' + '575流转'
    }
  },
  methods: {
    getApiData () {
      this.loading = true
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/list/'
      axios
        .get(path)
        .then(response => {
          this.data = response.data.data
          this.filter_mg = response.data.filter_mg
          this.loading = false
          console.log('成功')
          console.log(response.data.filter_mg)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSelecVal (selection) {
      console.log(selection)
      this.my_selection.push(selection)
    },
    getAllVal (selection) {
      console.log(selection)
      this.my_selection.push(selection)
    },
    delVal (selection) {
      // console.log(selection)
      this.my_selection = selection
    },
    Submit () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/list/flow/'
      this.axios
        .post(path, {
          selection: this.my_selection
        })
        .then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
    },
    SubmitFlask () {
      this.Submit()
    },
    show (index) {
      this.$router.push({ path: `/snvlist/${this.data[index].Sample_name}` })
      console.log(this.data[index].Sample_name)
    },
    chEditStat () {
      if (this.edit_stat) {
        this.edit_stat = false
      } else {
        this.edit_stat = true
      }
    },
    mySlect () {
      this.Submit()
      this.$store.commit('addSelect', this.my_selection)
      // this.$router.push({ path: `/editsam` })
      console.log(this.list_s)
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: this.filename,
        data: this.my_selection,
        columns: this.columns
      })
    },
    strToDate (date) {
      return new Date(Date.parse(date.replace(/\./g, '/')))
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
    }
  },
  mounted () {
    this.getApiData()
    this.$store.commit('addSelect', '')
  }
}
</script>
<style scoped>
#input-search{
    width: 300px;
    float: left;
}
</style>
