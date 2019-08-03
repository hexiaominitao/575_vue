<template>
<div id="my-form">
    <Form :model="formItem" :label-width="100">
        <FormItem label="患者姓名">
            <Input v-model="formItem.name" placeholder="data.患者姓名"></Input>
        </FormItem>
        <FormItem label="检测项目">
            <Select v-model="formItem.seqType">
                <Option value="575">575</Option>
            </Select>
        </FormItem>
<FormItem label="肿瘤">
            <Input v-model="formItem.cancer" placeholder="填写肿瘤类型"></Input>
        </FormItem>
<FormItem label="申请单号">
            <Input v-model="formItem.samCode" placeholder="填写申请单号"></Input>
        </FormItem>
<FormItem label="迈景编号">
            <Input v-model="formItem.mgCode" placeholder="填写迈景编号"></Input>
        </FormItem>
<FormItem label="样本类型">
            <Input v-model="formItem.samType" placeholder="填写样本类型"></Input>
        </FormItem>
        <FormItem label="收样日期">
          <DatePicker type="date" format='yyyy.MM.dd' placeholder="填写收样日期" v-model="formItem.reciveDate"></DatePicker>
        </FormItem>
<FormItem label="流转开始日期">
        <DatePicker type="date" format='yyyy.MM.dd' placeholder="流转开始日期" v-model="formItem.startDate"></DatePicker>
        </FormItem>
        <FormItem label="备注">
            <Input v-model="formItem.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="填写备注"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">添加</Button>
            <Button style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
export default {
  data () {
    return {
      data: [],
      formItem: {
        name: '',
        seqType: '',
        cancer: '',
        mgCode: '',
        samCode: '',
        samType: '',
        reciveDate: '',
        startDate: '',
        note: ''
      }
    }
  },
  methods: {
    getData () {
      const path = 'http://' + this.$store.state.hostIp + '/flow/api/list/' + this.$route.params.mgcode
      this.$axios
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
    }
  },
  mounted () {
    this.getData() vb
  }
}
</script>
<style scoped>
#my-form {
width: 30%;
margin-top: 20px;
}
</style>
