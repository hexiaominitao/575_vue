<template>
  <div>
    <Row>
      <Col span='6'>Run:<strong>{{ title.name }}</strong></Col>
      <Col span='6'>上机时间:<strong>{{ dateToString(title.start_T) }}</strong></Col>
      <Col span='6'>下机时间:<strong>{{ dateToString(title.end_T) }}</strong></Col>
      <Col span='6'><Button type="primary" @click="downloadFile" >生成SampleSheet</Button></Col>
    </Row>
    <br>
    <Table border height='520' :columns='seq_columns' :data='seq_data'>
      </Table>
  </div>
</template>
<script>
export default {
  name: 'ViewSeq',
  data () {
    return {
      title: [],
      seq_data: [],
      seq_columns: [
        {
          title: '迈景编号',
          key: 'sample_name'
        },
        {
          title: '检测项目',
          key: 'item'
        },
        {
          title: 'Barcode',
          key: 'barcode'
        },
        {
          title: '备注',
          key: 'note'
        }
      ]
    }
  },
  computed: {
    my_name () {
      return this.$route.params.name
    }
  },
  // watch: {
  //   my_name: function () {
  //     this.getData
  //   }
  // },
  methods: {
    getData (runname) {
      this.loading = true
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/seq_info/' + runname
      this.axios
        .get(path)
        .then(response => {
          this.title = response.data.run
          this.seq_data = response.data.seq
          this.loading = false
          console.log(this.dateToString(this.title.start_T))
        })
        .catch(error => {
          console.log(error)
        })
    },
    dateToString (str) {
      var date = new Date(str + '+0800')
      if (date instanceof Date) {
        var year = date.getFullYear()
        var month = (date.getMonth() + 1).toString()
        var day = (date.getDate()).toString()
        var hour = (date.getHours()).toString()
        var min = (date.getMinutes()).toString()
        if (month.length === 1) {
          month = '0' + month
        }
        if (day.length === 1) {
          day = '0' + day
        }
        if (hour.length === 1) {
          hour = '0' + hour
        }
        if (min.length === 1) {
          min = '0' + min
        }
        var dateTime = year + '.' + month + '.' + day + ' ' + hour + ':' + min
        return dateTime
      } else {
        return date
      }
    },
    downloadFile () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/download/' + this.$route.params.mg_id
      window.location.href = path
    }
  },
  mounted () {
    this.getData(this.$route.params.mg_id)
  }
}
</script>
