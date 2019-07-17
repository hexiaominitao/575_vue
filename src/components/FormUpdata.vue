<template>
<div>
   <Steps :current="0" size="small" style="margin: auto;">
        <Step title="提取"></Step>
        <Step title="建库"></Step>
        <Step title="测序"></Step>
        <Step title="生信"></Step><Step title="报告"></Step><Step title="审核"></Step>
    </Steps>
    <Form :model="formItem" :label-width="80">
        <FormItem label="提取" style="width: 200px">
             <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 200px"></DatePicker>
        </FormItem>
        <FormItem label="Checkbox">
            <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
    </Form>
    <p>{{ count  }}</p>
    <Button @click="add">+1</Button>
</div>
</template>
<script>
export default {
  name: 'FormUpdata',
  data () {
    return {
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      }
    }
  },
  methods: {
    add () {
      this.$store.commit('add')
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>
