<template>
<div>
    <Table stripe
           :columns="columns5"
           :loading="loading"
           height="550"
           :data="data5"
           size="small"
           @on-selection-change='selSam'
           ref="table"></Table>
           <Button type="primary" @click="delVal"
            >保存</Button>
</div>
</template>
<script>
export default {
  data () {
    return {
      listStyle: {
        width: '600px',
        height: '400px'
      },
      my_selection: [],
      list_title: {'distill': [10, 20],
        'build': [11, 20],
        'run': [12, 13],
        'seq': [14, 20],
        'analysis': [15, 16],
        'report': [17, 18],
        'check': [19, 20],
        'note': [21, 20]},
      columns4: [
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
          'sortable': true,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            let currenStep = this.$route.params.step
            if (currenStep === 'distill') {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: self.data5[params.index].提取完成日期,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.data5[params.index].提取完成日期 = val
                      self.data5[params.index].状态 = '提取完成'
                    }
                  }
                })
              ])
            } else {
              return h('div', self.data5[params.index].提取完成日期)
            }
          }
        },
        {
          'title': '建库完成日期',
          'key': '建库完成日期',
          'width': 150,
          'sortable': true,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            let currenStep = this.$route.params.step
            if (currenStep === 'build') {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: self.data5[params.index].建库完成日期,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.data5[params.index].建库完成日期 = val
                      self.data5[params.index].状态 = '建库完成'
                    }
                  }
                })
              ])
            } else {
              return h('div', self.data5[params.index].建库完成日期)
            }
          }
        },
        {
          'title': '实际上机日期',
          'key': '实际上机日期',
          'width': 150,
          'sortable': true,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            let currenStep = this.$route.params.step
            if (currenStep === 'run') {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: self.data5[params.index].实际上机日期,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.data5[params.index].实际上机日期 = val
                      self.data5[params.index].状态 = '上机完成'
                    }
                  }
                })
              ])
            } else {
              return h('div', self.data5[params.index].实际上机日期)
            }
          }
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
          'sortable': true,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            let currenStep = this.$route.params.step
            if (currenStep === 'seq') {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: self.data5[params.index].测序完成日期,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.data5[params.index].测序完成日期 = val
                      self.data5[params.index].状态 = '测序完成'
                    }
                  }
                })
              ])
            } else {
              return h('div', self.data5[params.index].测序完成日期)
            }
          }
        },
        {
          'title': '生信完成日期',
          'key': '生信完成日期',
          'width': 150,
          'sortable': true,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            let currenStep = this.$route.params.step
            if (currenStep === 'analysis') {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: self.data5[params.index].生信完成日期,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.data5[params.index].生信完成日期 = val
                      self.data5[params.index].状态 = '生信完成'
                    }
                  }
                })
              ])
            } else {
              return h('div', self.data5[params.index].生信完成日期)
            }
          }
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
          'sortable': true,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            let currenStep = this.$route.params.step
            if (currenStep === 'report') {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: self.data5[params.index].报告完成时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.data5[params.index].报告完成时间 = val
                      self.data5[params.index].状态 = '报告完成'
                    }
                  }
                })
              ])
            } else {
              return h('div', self.data5[params.index].报告完成时间)
            }
          }
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
          'sortable': true,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            let currenStep = this.$route.params.step
            if (currenStep === 'check') {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: self.data5[params.index].审核完成时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.data5[params.index].审核完成时间 = val
                      self.data5[params.index].状态 = '审核完成'
                    }
                  }
                })
              ])
            } else {
              return h('div', self.data5[params.index].审核完成时间)
            }
          }
        },
        {
          'title': '审核倒计时/天',
          'key': '审核倒计时',
          'width': 150,
          'sortable': true,
          'sortType': 'asc',
          render: (h, params) => {
            let day = 0
            if (params.row.type === 'b') {
              day = 14
            } else {
              day = 11
            }
            return h('div',
              this.calDays(params.row.流转开始日期, day))
          }
        },
        {
          'title': '备注',
          'key': '备注',
          'width': 120,
          'sortable': true,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            let currenStep = this.$route.params.step
            if (currenStep === 'note') {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: self.data5[params.index].备注,
                    type: 'text',
                    style: 'width: 150px'
                  },
                  on: {
                    'on-change': (val) => {
                      self.data5[params.index].备注 = val
                    }
                  }
                })
              ])
            } else {
              return h('div', self.data5[params.index].备注)
            }
          }
        }, {
          'title': '预计完成时间',
          'key': '预计完成时间',
          'width': 150,
          'fixed': 'right',
          'sortable': true,
          'sortType': 'desc'
        }
        // {
        //   title: '操作',
        //   key: '操作',
        //   width: 80,
        //   align: 'center',
        //   fixed: 'right',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '5px'
        //         },
        //         on: {
        //           click: () => {
        //             this.$Message.info('点击了终止')
        //             this.handleRender(this.data5[params.index].迈景编号)
        //           }
        //         }
        //       }, '终止')
        //     ])
        //   }
        // }
      ],
      columns5: [],
      data_distill: [],
      data_all: [],
      loading: false
    }
  },
  computed: {
    data5 () {
      let myData = this.data_all
      // let currenStep = this.$route.params.step
      return myData['distill']
    }
  },
  watch: {
    '$route': 'myColumns'
  },
  methods: {
    getApiData () {
      this.loading = true
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/flowing/'
      this.axios
        .get(path)
        .then(response => {
          this.data_distill = response.data.distill
          this.filter_mg = response.data.filter_mg
          this.data_all = response.data
          this.loading = false
          console.log('成功')
          console.log(response.data.data_b)
        })
        .catch(error => {
          console.log(error)
        })
    },
    Submit1 () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/submit1/'
      this.axios
        .post(path, {
          data: JSON.parse(localStorage.getItem('select_list'))
        })
        .then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
    },
    delVal () {
      let currenStep = this.$route.params.step
      console.log(currenStep)
      localStorage.setItem('select_list', JSON.stringify(this.my_selection))
      this.Submit1()
      // localStorage.removeItem('select_list')
      // this.$store.state.list_select = []
    },
    myColumns () {
      let currenStep = this.$route.params.step
      let myData = this.columns4
      this.columns5 = []
      myData[this.list_title[currenStep][0]].fixed = 'right'
      myData[this.list_title[currenStep][1]].fixed = 'right'
      this.columns5 = myData
      console.log(this.list_title[currenStep][0])
      // myData = []
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
    selSam (selection) {
      this.my_selection = selection
    },
    handleRender (item) {
      this.$Modal.confirm({
        title: '终止' + item + '的流转',
        onOk: () => { this.$Message.info('点击了确定') },
        onCancel: () => {},
        render: (h) => {
          return h('Input', {
            props: {
              value: item.终止原因,
              type: 'textarea',
              clearable: true,
              autofocus: true,
              placeholder: '请填写终止原因'
            },
            on: {
              input: (val) => {
                this.value = val
              }
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getApiData()
    this.myColumns()
    console.log(this.$route.params.step)
    let currenStep = this.$route.params.step
    console.log(this.list_title[currenStep])
  }
}
</script>
