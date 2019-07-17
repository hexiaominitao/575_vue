import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import SamList from '@/components/SamList'
import FormUpdata from '@/components/FormUpdata'
import UploadFile from '@/components/UploadFile'
import EditSam from '@/components/EditSam'

Vue.use(iView)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/register',
      name: ' Register',
      component: Register
    }, {
      path: '/samlist',
      name: 'SamList',
      component: SamList
    }, {
      path: '/formupdata',
      name: 'FormUpdata',
      component: FormUpdata
    }, {
      path: '/uploadfile',
      name: 'UploadFile',
      component: UploadFile
    }, {
      path: '/editsam',
      name: 'EditSam',
      component: EditSam
    }
  ]
})
