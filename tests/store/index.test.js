import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import i18n from "@/i18n"
import store from "@/store"
import * as aTypes from '@/store/action-types';

describe('store/index.js（Vuex設定）', () => {
	let wrapper;

	beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(store);
        const Component = Vue.component('test-component', {
            name: 'test-component',
            data () {
              return {
              }
            },
            template: '<div></div>'
        });

		wrapper = shallowMount(Component, { 
            localVue,
            i18n,
            store
		});
	});

	it('aTypes.CHANGE_LANG', () => {
        global.document.documentElement.setAttribute = jest.fn();
        global.document.title = '';

        wrapper.vm.$store.dispatch(aTypes.CHANGE_LANG, 'ja');
        expect(global.document.documentElement.setAttribute).toBeCalledWith('lang', 'ja');
        expect(global.document.title).toBe('VUEサンプル');
        expect(wrapper.vm.$store.state.lang).toBe('ja');
    })

	it('aTypes.CLEAR_CACHE', () => {
        jest.useFakeTimers();
        wrapper.vm.$store.dispatch(aTypes.CLEAR_CACHE);
        expect(wrapper.vm.$store.state.enableCache).toBeFalsy();
        jest.runAllTimers();
        expect(wrapper.vm.$store.state.enableCache).toBeTruthy();
    })

	it('aTypes.SET_MESSAGE_DIALOG', () => {
        let dialogObj = {dialog:'dialog'};
        wrapper.vm.$store.dispatch(aTypes.SET_MESSAGE_DIALOG, dialogObj);
        expect(wrapper.vm.$store.state.messageDialog).toMatchObject(dialogObj);
    })

	it('aTypes.HIDE_SIDE_MENU', () => {
        wrapper.vm.$store.dispatch(aTypes.HIDE_SIDE_MENU);
        expect(wrapper.vm.$store.state.isShowSideMenu).toBeFalsy();
    })

	it('aTypes.SHOW_SIDE_MENU', () => {
        wrapper.vm.$store.dispatch(aTypes.SHOW_SIDE_MENU);
        expect(wrapper.vm.$store.state.isShowSideMenu).toBeTruthy();
    })

    it('aTypes.SET_LOADING_DIALOG', () => {
        let dialogObj = {loadingDialog:'loading'};
        wrapper.vm.$store.dispatch(aTypes.SET_LOADING_DIALOG, dialogObj);
        expect(wrapper.vm.$store.state.loadingDialog).toMatchObject(dialogObj);
	})
})
