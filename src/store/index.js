import Vue from 'vue';
import Vuex from 'vuex';
import {default as i18n, enableLangs, DEFAULT_LANG} from '@/i18n';
import * as mTypes from './mutation-types';
import * as aTypes from './action-types';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    lang: DEFAULT_LANG,
    enableLangs: enableLangs,
    enableCache: true,
    gamenStyle: {},
    messageDialog: null,
    isShowSideMenu: true,
    loadingDialog: null
  },
  mutations: {
    [mTypes.SET_LANG](state, lang) {
      state.lang = lang;
    },
    [mTypes.IS_ENABLE_CACHE](state, bool) {
      state.enableCache = bool;
    },
    [mTypes.SET_MESSAGE_DIALOG](state, dialogObj) {
      state.messageDialog = dialogObj;
    },
    [mTypes.IS_SHOW_SIDE_MENU](state, isShow) {
      state.isShowSideMenu = isShow;
    },
    [mTypes.SET_LOADING_DIALOG](state, dialogObj) {
      state.loadingDialog = dialogObj;
    }
  },
  actions: {
    [aTypes.CHANGE_LANG](context, lang) {
      i18n.locale = lang;
      document.documentElement.setAttribute('lang', i18n.locale);
      document.title = i18n.t('caption.VUEサンプル');
      context.commit(mTypes.SET_LANG, lang);
    },
    [aTypes.CLEAR_CACHE](context) {
      context.commit(mTypes.IS_ENABLE_CACHE, false);
      setTimeout(function () {
        context.commit(mTypes.IS_ENABLE_CACHE, true);
      }, 1);
    },
    [aTypes.SET_MESSAGE_DIALOG](context, dialogObj) {
      context.commit(mTypes.SET_MESSAGE_DIALOG, dialogObj);
    },
    [aTypes.HIDE_SIDE_MENU](context) {
      context.commit(mTypes.IS_SHOW_SIDE_MENU, false);
    },
    [aTypes.SHOW_SIDE_MENU](context) {
      context.commit(mTypes.IS_SHOW_SIDE_MENU, true);
    },
    [aTypes.SET_LOADING_DIALOG](context, dialogObj) {
      context.commit(mTypes.SET_LOADING_DIALOG, dialogObj);
    }
  }
});

export default store;