<template>
  <div>
    <span id='top-bar'>
<Button type="primary" @click="runSlect"
            >开始流转</Button>
<Button type="primary" @click="mySlect"
            >删除</Button>
<Button type="primary" @click="getApiData(1)"
            >刷新</Button>
            <Button type="primary" to="/add"
            >新增</Button>
            <Input id="input-search" v-model='val' @on-search="remoteMethod1" search placeholder="输入迈景编号" /></span>
    <Table stripe :columns="columns"
           :loading="loading"
           height="600"
           :data="list_s"
           size="small"
           @on-selection-change='delVal'
           ref="table">
      <template slot-scope="{ row }" slot="迈景编号">
        <div @click="editSam(row.迈景编号)">{{ row.迈景编号 }}
        </div>
      </template>
    </Table>
           <Page :total="total" size="small" :page-size="15" show-elevator
            @on-change="setPage"/>
  </div>
</template>
<script>
export default {
  name: 'SamList',
  data () {
    return {
      hostIP: 'http://' + this.$store.state.hostIp,
      filter_mg: [],
      data_all: [],
      val: '',
      my_data: [],
      edit_stat: false,
      input_value: [],
      total: 0,
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
          'slot': '迈景编号',
          'width': 120,
          'sortable': true,
          'fixed': 'left'
          // render: (h, params) => {
          //   return h('div', [
          //     h('div', {
          //       on: {
          //         click: () => {
          //           // eslint-disable-next-line standard/object-curly-even-spacing
          //           this.$router.push({ name: `EditAdmin`, params: { mgcode: params.row.迈景编号 }})
          //           this.$Message.info('点击了' + params.row.迈景编号)
          //         }
          //       }
          //     }, params.row.迈景编号)
          //   ])
          // }
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
      if (this.val) {
        return this.my_data
      } else { return this.data }
    }
  },
  methods: {
    getAllData () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/list'
      this.axios
        .get(path)
        .then(response => {
          this.data_all = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getApiData (page) {
      this.loading = true
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/list/page/' + page
      this.axios
        .get(path)
        .then(response => {
          this.data = response.data.data
          this.total = response.data.total
          this.loading = false
          console.log('成功')
          console.log(response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setPage (page) {
      this.page = page
      this.getApiData(page)
    },
    getSelecVal (selection) {
      console.log(selection)
      this.my_selection.push(selection)
    },
    getAllVal (selection) {
      console.log(selection)
      this.my_selection.push(selection)
    },
    editSam (mgcode) {
      this.$router.push({name: `EditAdmin`, params: { mgcode: mgcode }})
      this.$Message.info('点击了' + mgcode)
    },
    delVal (selection) {
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
    delSelect () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/list/del/'
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
    show (index) {
      this.$router.push({ path: `/snvlist/${this.data[index].Sample_name}` })
      console.log(this.data[index].Sample_name)
    },
    mySlect () {
      this.$Modal.confirm({
        title: '确定删除所选样本',
        onOk: () => {
          this.$Message.info('成功删除,点击刷新')
          this.delSelect()
        },
        onCancel: () => { this.$Message.info('取消删除') }
      })
    },
    runSlect () {
      this.$Modal.confirm({
        title: '确定开始流转所选样本',
        onOk: () => {
          this.$Message.info('开始流转,点击流转中查看')
          this.Submit()
        },
        onCancel: () => { this.$Message.info('取消流转') }
      })
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '575流转'
      })
    },
    strToDate (date) {
      return new Date(Date.parse(date.replace(/\./g, '/')))
    },
    calDays (date, days) {
      // date eg:'2019.07.31'(str) days: 9(int)
      let s1 = date
      s1 = new Date(Date.parse(s1.replace(/\./g, '/')))
      let s2 = new Date()
      let day = s2.getTime() - s1.getTime()
      let time = parseInt(day / (1000 * 60 * 60 * 24))
      if (days - time > 0) {
        return days - time
      } else {
        return 0
      }
    },
    remoteMethod1 (query) {
      if (query !== '') {
        this.my_data = this.data.filter(item => item.迈景编号.toLowerCase().indexOf(query.toLowerCase()) > -1)
      } else {
        this.my_data = this.list_s
      }
    }
  },
  mounted () {
    this.getApiData(1)
    // this.getAllData()
    this.$store.commit('addSelect', '')
  }
}
</script>
<style scoped>
#input-search{
    width: 300px;
    float: right;
}
</style>
