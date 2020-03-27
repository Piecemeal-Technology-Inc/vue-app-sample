import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import * as aTypes from '@/store/action-types';
import NotFound from './components/base/NotFound';
import Ichiran from './components/screen/Ichiran';
import Shosai from './components/screen/Shosai';
import Toroku from './components/screen/Toroku';
import TorokuKanryo from './components/screen/TorokuKanryo';
import Transition from './utilities/Transition';

Vue.use(VueRouter);

const PATH_PREFIX = '/:lang';

let routes = [
  {
    path: '/',
    redirect: '/' + store.state.lang + '/ichiran'
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: PATH_PREFIX,
    redirect: PATH_PREFIX + '/ichiran'
  },
  {
    path: PATH_PREFIX + '/ichiran',
    name: 'ichiran',
    component: Ichiran
  },
  {
    path: PATH_PREFIX + '/shosai',
    name: 'shosai',
    component: Shosai
  },
  {
    path: PATH_PREFIX + '/toroku',
    name: 'toroku',
    component: Toroku
  },
  {
    path: PATH_PREFIX + '/kanryo',
    name: 'kanryo',
    component: TorokuKanryo
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE,
  base: process.env.BASE_URL,
  routes
});


const TRANSITION_TIME = 500;

function movePage(next, isCacheClear, delay) {
  setTimeout( function () {
    if (isCacheClear) {
      store.dispatch(aTypes.CLEAR_CACHE);
    }
    next()
  }, delay);
}

// 画面遷移前イベント
router.beforeEach((to, from, next) => {
  setTimeout(function () {
    Transition.fadeOut(store.state.gamenStyle, TRANSITION_TIME);
  }, 1);

  if (!to.params.lang || store.state.enableLangs.includes(to.params.lang)) {
    movePage(next, to.params.isCacheClear, TRANSITION_TIME);
  } else {
    next({path:'/404'});
  }
})

// 画面遷移後イベント
router.afterEach((to) => {
  store.dispatch(aTypes.CHANGE_LANG, to.params.lang);
  // キャッシュされた画面を表示時する際にレイアウトが正常に戻るのを待ってから画面を表示する為、setTimeoutで時間調整
  setTimeout(function () {
    Transition.fadeIn(store.state.gamenStyle, TRANSITION_TIME);
  }, 300);
})


export default router;