<template>
<div>
<Table border height='520' :columns='columns' :data='data'>
      </Table>
    <Page :total="total" size="small" :page-size="20" show-elevator
    @on-change="setPage"/>
</div>
</template>
<script>
export default {
  name: 'RunInfo',
  data () {
    return {
      total: 0,
      loading: true,
      columns: [
        {
          title: 'Run',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('div', {
                on: {
                  click: () => {
                    this.$router.push({ name: `ViewSeq`,
                      params: { mg_id: params.row.name }})
                    this.$Message.info('点击了' + params.row.name)
                  }
                }
              }, params.row.name)
            ])
          }
        },
        {
          title: '上机时间',
          key: 'start_T'
        },
        {
          title: '下机时间',
          key: 'end_T'
        },
        {
          title: '测序平台',
          key: 'platform'
        }
      ],
      data: []
    }
  },
  methods: {
    getData (page) {
      this.loading = true
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/run_info/' + page
      this.axios
        .get(path)
        .then(response => {
          this.data = response.data.data
          this.total = response.data.total
          this.loading = false
          console.log(response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setPage (page) {
      this.page = page
      this.getData(page)
    }
  },
  mounted () {
    this.getData(1)
  }
}
</script>
