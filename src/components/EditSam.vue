<template>
  <div>
    <Menu mode="horizontal" active-name="1" @on-select="toUrl">
        <MenuItem name="1" to="/editsam/viewsam">
            预览
        </MenuItem>
        <MenuItem name="distill">
            提取
        </MenuItem>
        <MenuItem name="build">
            建库
        </MenuItem>
        <MenuItem name="run">
            上机
        </MenuItem>
        <MenuItem name="seq">
            测序
        </MenuItem>
        <MenuItem name="analysis">
            生信
        </MenuItem>
        <MenuItem name="report">
            报告
        </MenuItem>
        <MenuItem name="check">
            审核
        </MenuItem>
        <MenuItem name="note">
            备注
        </MenuItem>
    </Menu>
    <br>
    <Content :style="{margin: '0 20px 0', background: '#fff', minHeight: '500px'}">
                <router-view :key="key"/>
            </Content>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  name: 'EditSam',
  data () {
    return {
      current_this: 0,
      hahw: 'right',
      columns1: [
        {
          'title': '实际提取完成时间',
          'key': '实际提取完成时间',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            if (this.edit_status[this.current_this]['distill']) {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: params.row.实际提取完成时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd',
                    required: true
                  },
                  on: {
                    'on-change': (val) => {
                      self.list_s[params.index].实际提取完成时间 = val
                    }
                  }
                })
              ])
            } else {
              return h('div', params.row.实际提取完成时间)
            }
          }
        },
        {
          'title': '实际建库开始时间',
          'key': '实际建库开始时间',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            if (this.edit_status[this.current_this]['build']) {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: params.row.实际建库开始时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.list_s[params.index].实际建库开始时间 = val
                    }
                  }
                })
              ])
            } else {
              return h('div', params.row.实际建库开始时间)
            }
          }
        },
        {
          'title': '实际建库完成时间',
          'key': '实际建库完成时间',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            // if (this.edit_status[this.current_this]['build']) {
            if (!params.row.实际建库完成时间) {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: self.list_s[params.index].实际建库完成时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.list_s[params.index].实际建库完成时间 = val
                      self.list_s[params.index].状态 = '建库完成'
                    }
                  }
                })
              ])
            } else {
              return h('div',
                [h('div',
                  {style: {
                    // marginRight: '1px'
                    display: 'inline'
                  }}, params.row.实际建库完成时间),
                h('Button', {
                  props: {
                    shape: 'circle',
                    icon: 'ios-create-outline'
                  },
                  style: {
                  // marginRight: '1px'
                    display: 'inline'
                  },
                  on: {
                    click: () => {
                      params.row.实际建库完成时间 = ''
                    }
                  }
                })])
            }
          }
        },
        {
          'title': '实际测序完成时间',
          'key': '实际测序完成时间',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            if (this.edit_status[this.current_this]['seq']) {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: params.row.实际测序完成时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.list_s[params.index].实际测序完成时间 = val
                    }
                  }
                })
              ])
            } else {
              return h('div', params.row.实际测序完成时间)
            }
          }
        },
        {
          'title': '实际生信完成时间',
          'key': '实际生信完成时间',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            if (this.edit_status[this.current_this]['analysis']) {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: params.row.实际生信完成时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.list_s[params.index].实际生信完成时间 = val
                    }
                  }
                })
              ])
            } else {
              return h('div', params.row.实际生信完成时间)
            }
          }
        },
        {
          'title': '实际报告完成时间',
          'key': '实际报告完成时间',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            if (this.edit_status[this.current_this]['report']) {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: params.row.实际报告完成时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.list_s[params.index].实际报告完成时间 = val
                    }
                  }
                })
              ])
            } else {
              return h('div', params.row.实际报告完成时间)
            }
          }
        },
        {
          'title': '实际审核完成时间',
          'key': '实际审核完成时间',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            if (this.edit_status[this.current_this]['check']) {
              return h('div', [
                h('DatePicker', {
                  props: {
                    placeholder: params.row.实际审核完成时间,
                    type: 'date',
                    style: 'width: 150px',
                    format: 'yyyy.MM.dd'
                  },
                  on: {
                    'on-change': (val) => {
                      self.list_s[params.index].实际审核完成时间 = val
                    }
                  }
                })
              ])
            } else {
              return h('div', params.row.实际审核完成时间)
            }
          }
        },
        {
          'title': '最终优先度',
          'key': '最终优先度',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            // eslint-disable-next-line no-unused-vars
            const gradeList = [
              {name: 'S', value: 'S'},
              {name: 'A', value: 'A'},
              {name: 'B', value: 'B'},
              {name: 'C', value: 'C'},
              {name: 'D', value: 'D'}]
            if (this.edit_status[this.current_this]['final']) {
              return h('div', [
                h('Select', {
                  props: {
                    value: params.row.最终优先度
                  },
                  on: {
                    'on-change': (val) => {
                      self.list_s[params.index].最终优先度 = val
                    }
                  }
                }, gradeList.map(item => {
                  return h('Option', {
                    props: {
                      value: item.value
                    }
                  }, item.name)
                }))
              ])
            } else {
              return h('div', params.row.最终优先度)
            }
          }
        },
        {
          'title': '备注',
          'key': '备注',
          'width': 150,
          render: (h, params) => {
            // eslint-disable-next-line no-unused-vars
            let self = this
            if (this.edit_status[this.current_this]['note']) {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: params.row.备注
                  },
                  on: {
                    'on-blur': (val) => {
                      self.list_s[params.index].备注 = event.target.value
                      // alert(event.target.value)
                    }
                  }
                })
              ])
            } else {
              return h('div', params.row.备注)
            }
          }
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
          'key': '肿瘤',
          'width': 150,
          'sortable': true
        },
        {
          'title': '申请单号',
          'key': '申请单号',
          'width': 150,
          'sortable': true
        },
        {
          'title': '迈景编号',
          'key': '迈景编号',
          'width': 120,
          'fixed': 'left',
          'sortable': true
        },
        {
          'title': '类型',
          'key': '类型',
          'width': 80,
          'sortable': true
        },
        {
          'title': '收样时间',
          'key': '收样时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '是否时间点前',
          'key': '是否时间点前',
          'width': 150,
          'sortable': true
        },
        {
          'title': '周几',
          'key': '周几',
          'width': 80,
          'sortable': true
        },
        {
          'title': '预计优先度',
          'key': '预计优先度',
          'width': 150,
          'sortable': true
        },
        {
          'title': '预计完成时间',
          'key': '预计完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '预计提取完成时间',
          'key': '预计提取完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '预计建库完成时间',
          'key': '预计建库完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '预计测序完成时间',
          'key': '预计测序完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '预计生信完成时间',
          'key': '预计生信完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '预计报告完成时间',
          'key': '预计报告完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '预计审核完成时间',
          'key': '预计审核完成时间',
          'width': 150,
          'sortable': true
        }
      ],
      data1: [],
      loading: false
    }
  },
  computed: {
    list_s () {
      return this.data1
    },
    key () {
    // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.fullPath
    },
    edit_status () {
      return {0: {'distill': true},
        1: {'build': true},
        2: {'seq': true},
        3: {'analysis': true},
        4: {'report': true},
        5: {'check': true},
        6: {'final': true},
        7: {'note': true}}
    }
  },
  methods: {
    getApiData () {
      this.loading = true
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/flowing/'
      this.axios
        .get(path)
        .then(response => {
          this.data1 = response.data.data
          this.filter_mg = response.data.filter_mg
          this.loading = false
          console.log('成功')
          console.log(response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    Submit () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/review/'
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
    show (index) {
      this.$router.push({ path: `/snvlist/${this.data[index].Sample_name}` })
      console.log(this.data[index].Sample_name)
    },
    currentAdd () {
      if (this.current_this < 7) { this.current_this++ } else {
        this.current_this = 0
      }
    },
    setVal () {
      localStorage.setItem('select_list', JSON.stringify(this.list_s))
      this.Submit1()
      this.currentAdd()
      console.log(this.edit_status[this.current_this]['build'])
    },
    saveData () {
      localStorage.setItem('select_list', JSON.stringify(this.list_s))
      this.Submit1()
    },
    setDate () {
      localStorage.setItem('select_list', JSON.stringify(this.list_s))
      this.Submit()
      localStorage.removeItem('select_list')
      this.$store.state.list_select = []
      this.$router.push({ path: `/samlist/` })
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '575流转'
      })
    },
    toUrl (name) {
      console.log(name)
      this.$router.push({name: 'StepSam', params: {step: name}})
    }
  },
  mounted () {
    this.getApiData()
    console.log(this.path)
  }
}
</script>
<style scoped>
#input-search{
    width: 300px;
    float: right;
}
</style>
