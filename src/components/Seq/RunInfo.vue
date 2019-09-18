<template>
<div>
<Table border height='520' :columns='columns' :data='data'>
<template slot-scope="{ row }" slot="start_T">
<div>{{ dateToString(row.start_T) }}</div>
</template>
<template slot-scope="{ row }" slot="end_T">
<div>{{ dateToString(row.end_T) }}</div>
</template>
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
          slot: 'start_T'
        },
        {
          title: '下机时间',
          slot: 'end_T'
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
