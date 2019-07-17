<template>
  <div>
            <Button type="primary" @click="mySlect"
            >开始流转</Button>
            <Button type="primary" @click="getApiData"
            >刷新</Button>
            <Button type="primary" @click="exportData"
            >导出</Button>
            <!-- <div id="input-search"><Input search
     autofocus
     placeholder="输入样本编号" /></div> -->
    <Table :columns="columns"
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
          align: 'center'
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
          'sortable': true,
          props: ['value'],
          render: (h, params) => {
            if (this.edit_stat) {
              return h('div', [
                h('Input', {
                  props: {
                    placeholder: params.row.患者姓名
                  }
                })
              ])
            } else {
              return h('div', params.row.患者姓名)
            }
          }
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
          'title': '实际提取完成时间',
          'key': '实际提取完成时间',
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
          'title': '实际建库开始时间',
          'key': '实际建库开始时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '实际建库完成时间',
          'key': '实际建库完成时间',
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
          'title': '实际测序完成时间',
          'key': '实际测序完成时间',
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
          'title': '实际生信完成时间',
          'key': '实际生信完成时间',
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
          'title': '实际报告完成时间',
          'key': '实际报告完成时间',
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
          'title': '实际审核完成时间',
          'key': '实际审核完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '预计审核完成时间',
          'key': '预计审核完成时间',
          'width': 150,
          'sortable': true
        },
        {
          'title': '最终优先度',
          'key': '最终优先度',
          'width': 150,
          'sortable': true
        },
        {
          'title': '备注',
          'key': '备注',
          'width': 150,
          'sortable': true
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
      this.$router.push({ path: `/editsam` })
      console.log(this.list_s)
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '575流转'
      })
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
