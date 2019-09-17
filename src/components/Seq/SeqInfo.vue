<template>
  <div>
    <Row>
      <Col span='6'>Run:<strong>{{ title.name }}</strong></Col>
      <Col span='6'>上机时间:<strong>{{ title.start_T }}</strong></Col>
      <Col span='6'>下机时间:<strong>{{ title.end_T }}</strong></Col>
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
          console.log(response.data.run)
        })
        .catch(error => {
          console.log(error)
        })
    },
    downloadFile () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/download/' + this.$route.params.mg_id
      window.location.href = path
    }
  },
  mounted () {
    console.log(this.$route.params.mg_id)
    this.getData(this.$route.params.mg_id)
  }
}
</script>
