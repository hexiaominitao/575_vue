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
import ViewSam from '@/components/Sam/ViewSam'
import StepSam from '@/components/Sam/StepSam'
import DataAdmin from '@/components/Admin/AdminData'
import EditAdmin from '@/components/Admin/EditAdmin'
import AddAdmin from '@/components/Admin/AddAdmin'

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
      component: EditSam,
      children: [
        {
          path: 'viewsam',
          name: 'ViewSam',
          component: ViewSam
        }, {
          path: 'stepsam/:step',
          name: 'StepSam',
          component: StepSam
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Register
    }, {
      path: '/admin',
      name: 'DataAdmin',
      component: DataAdmin
    },
    {
      path: '/add',
      name: 'AddAdmin',
      component: AddAdmin
    },
    {
      path: '/edit/:mgcode',
      name: 'EditSam',
      component: EditAdmin
    }
  ]
})
