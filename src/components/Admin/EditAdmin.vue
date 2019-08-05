src/components/Admin/AdminData.vue<template>
<div id="my-form">
    <Form :model="formItem" :label-width="100">
        <FormItem label="患者姓名">
            <Input v-model="formItem.患者姓名" :placeholder="formItem.患者姓名"></Input>
        </FormItem>
        <FormItem label="检测项目">
            <Select v-model="formItem.检测项目" :placeholder="formItem.检测项目">
                <Option value="575">575</Option>
            </Select>
        </FormItem>
<FormItem label="肿瘤">
            <Input v-model="formItem.病理诊断" :placeholder="formItem.病理诊断"></Input>
        </FormItem>
<FormItem label="申请单号">
            <Input v-model="formItem.申请单号" :placeholder="formItem.申请单号"></Input>
        </FormItem>
<FormItem label="迈景编号">
            <Input v-model="formItem.迈景编号" :placeholder="formItem.迈景编号"></Input>
        </FormItem>
<FormItem label="样本类型">
            <Input v-model="formItem.样本类型" :placeholder="formItem.样本类型"></Input>
        </FormItem>
        <FormItem label="收样日期">
          <DatePicker type="date" format='yyyy.MM.dd' placeholder="收样日期" v-model="myDate.收样日期"></DatePicker>
        </FormItem>
<FormItem label="流转开始日期">
        <DatePicker type="date" format='yyyy.MM.dd' placeholder="流转开始日期" v-model="myDate.流转开始日期"></DatePicker>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formItem.备注" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="formItem.备注"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submit">提交</Button>
            <Button style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      data: []
    }
  },
  computed: {
    myDate () {
      return {收样日期: this.data[0].收样日期,
        流转开始日期: this.data[0].流转开始日期}
    },
    formItem () {
      return this.data[0]
    }
  },
  methods: {
    getData () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/list/' + this.$route.params.mgcode
      axios
        .get(path)
        .then(response => {
          this.data = response.data.data
          this.filter_mg = response.data.filter_mg
          this.loading = false
          console.log('成功')
          console.log(response.data.data[0].患者姓名)
        })
        .catch(error => {
          console.log(error)
        })
    },
    Submit1 () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/submit1/'
      this.formItem.收样日期 = this.dateToString(this.myDate.收样日期)
      this.formItem.流转开始日期 = this.dateToString(this.myDate.流转开始日期)
      this.axios
        .post(path, {
          data: this.formItem
        })
        .then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
    },
    submit () {
      this.Submit1()
      // console.log(this.formItem.收样日期)
      // console.log(this.dateToString(this.formItem.收样日期))
    },
    dateToString (date) {
      var year = date.getFullYear()
      var month = (date.getMonth() + 1).toString()
      var day = (date.getDate()).toString()
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      var dateTime = year + '.' + month + '.' + day
      return dateTime
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style scoped>
#my-form {
width: 30%;
margin-top: 20px;
}
</style>
