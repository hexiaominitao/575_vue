import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/Home')
    }, {
      path: '/register',
      name: ' Register',
      component: Register
    }, {
      path: '/samlist',
      name: 'SamList',
      component: () => import('@/components/SamList')
    }, {
      path: '/formupdata',
      name: 'FormUpdata',
      component: () => import('@/components/FormUpdata')
    }, {
      path: '/uploadfile',
      name: 'UploadFile',
      component: () => import('@/components/UploadFile')
    }, {
      path: '/editsam',
      name: 'EditSam',
      component: () => import('@/components/EditSam'),
      children: [
        {
          path: 'viewsam',
          name: 'ViewSam',
          component: () => import('@/components/Sam/ViewSam')
        }, {
          path: 'stepsam/:step',
          name: 'StepSam',
          component: () => import('@/components/Sam/StepSam')
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
      component: () => import('@/components/Admin/AdminData')
    },
    {
      path: '/add',
      name: 'AddAdmin',
      component: () => import('@/components/Admin/EditAdmin')
    },
    {
      path: '/edit/:mgcode',
      name: 'EditAdmin',
      component: () => import('@/components/Admin/AddAdmin')
    },
    {
      path: '/seq',
      name: 'Run',
      component: () => import('@/components/Seq/Run'),
      children: [
        {
          path: 'viewrun',
          name: 'ViewRun',
          component: () => import('@/components/Seq/RunInfo')
        },
        {
          path: 'uplaodrun',
          name: 'UploadRun',
          component: () => import('@/components/Seq/UploadRun')
        },
        {
          path: 'viewseq/:mg_id',
          name: 'ViewSeq',
          component: () => import('@/components/Seq/SeqInfo')
        }
      ]
    }
  ]
})
