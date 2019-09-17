<template>
<div>
<Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1" to='/seq/viewrun'>
            <Icon type="ios-paper" />
            RUN
        </MenuItem>
        <MenuItem name="2" to='/seq/uplaodrun'>
            <Icon type="ios-people" />
            上传
        </MenuItem>
 </Menu>
     <Content :style="{margin: '0 20px 0', background: '#fff', minHeight: '500px'}">
                <router-view/>
            </Content>
</div>
</template>
<script>
export default {
  name: 'Run'
}
</script>
