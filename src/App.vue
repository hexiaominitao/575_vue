<template>
    <div id="app">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%'}">
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"><router-link to="/"><img id="mglogo" src="./assets/mg.png"></router-link></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            <router-link to="/samlist">总览</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            <router-link to='/editsam'>流转中</router-link>
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            <router-link to='/uploadfile'>文件上传</router-link>
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            <a @click="See(hostIP)">用户</a>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '600px'}">
                <router-view />
            </Content>
            <Footer class="layout-footer-center">&copy; MyGene</Footer>
        </Layout>
    </div>
</template>
<script>
export default {
  data () {
    return {hostIP: 'http://' + this.$store.state.hostIp + '/login/'}
  },
  methods: {
    See (e) {
      window.location.href = e
    }
  }
}
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: right;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        margin: 0 auto;
        margin-left: 10px;
    }
    .layout-footer-center{
        text-align: center;
    }
    #mglogo{
        width: 100px;
        height: 40px;
    }
</style>
