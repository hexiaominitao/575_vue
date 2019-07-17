<template>
  <div class="input-mg">
     <Input search
     autofocus
     @on-enter="getData"
     size="large"
     placeholder="输入样本编号" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      data: [],
      search_data: []
    }
  },
  methods: {
    getData () {
      const path = 'http://127.0.0.1:8001/flow/api/list/'
      axios
        .get(path)
        .then(response => {
          this.data = response.data.data
          console.log('成功')
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-mg{
    width: 600px;
    margin: auto;
    margin-top: 100px;
}
</style>
