import { shallowMount, createLocalVue } from '@vue/test-utils'
import Ichiran from '@/components/screen/Ichiran.vue'
import i18n from "@/i18n";
import * as aTypes from '@/store/action-types'
import flushPromises from 'flush-promises'
import * as c from '@/const'

describe('一覧画面', () => {
	const localVue = createLocalVue();
	let wrapper;
    let mocks;

	beforeEach(() => {
		mocks = {
            $store: {
                dispatch: function (){},
                state: {
                    messageDialog: {
                        openInfo: function(){},
                        openConfirm: function (){}
                    }
                }
            },
            $axios: {
                get: jest.fn(() => new Promise(resolve => {
                    resolve({
                        data: [
                            {"id": "1", "name": "サンプル 名前1", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"}
                        ]
                    });
                })),
                delete: jest.fn(() => new Promise(resolve => {
                    resolve();
                }))
            },
            $router: {
                push: function() {}
            }
		}

		wrapper = shallowMount(Ichiran, { 
			localVue,
			mocks,
            i18n            
		});
	});

    it('mounted', () => {
        let loadData = jest.fn();
        wrapper.setMethods({loadData});
        wrapper.vm.$options.mounted[0].call(wrapper.vm);
        expect(loadData).toBeCalled();
    })

	it('activated', () => {
        wrapper.vm.$store.dispatch = jest.fn();

        wrapper.vm.$options.activated[0].call(wrapper.vm);

        expect(wrapper.vm.$store.dispatch).toBeCalledWith(aTypes.SHOW_SIDE_MENU);
    })

    it('search', async () => {
        wrapper.vm.$store.state.messageDialog.openInfo = jest.fn();

        // 入力チェックエラー
        wrapper.vm.$refs.obs.validate = jest.fn(() => new Promise(resolve => {
            resolve(false);
        }));
        wrapper.vm.$axios.get.mockClear();

        wrapper.vm.search();
        await flushPromises();

        expect(wrapper.vm.$store.state.messageDialog.openInfo).toBeCalledWith('M00012');

        // 入力チェックOK
        wrapper.vm.name = 'sample-name';
        wrapper.vm.$refs.obs.validate = jest.fn(() => new Promise(resolve => {
            resolve(true);
        }));

        wrapper.vm.search();
        await flushPromises();

        expect(wrapper.vm.$axios.get).toBeCalledWith('/joho', {params:{mode: c.SearchMode.ALL, name:wrapper.vm.name}});
        expect(wrapper.vm.dataList[wrapper.vm.activeTabIndex].data).toMatchObject([{"id": "1", "name": "サンプル 名前1", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"}]);
    })

    it('deleteData', async () => {
        wrapper.vm.$store.state.messageDialog.openConfirm = jest.fn((messageCode,args,title,callback) => {
            callback();
        });

        wrapper.vm.dataList[wrapper.vm.activeTabIndex].data = [{"id": "1", "name": "サンプル 名前1", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"}];

        wrapper.vm.deleteData(0, {id: '1'});
        await flushPromises();

        expect(wrapper.vm.$store.state.messageDialog.openConfirm.mock.calls[0][0]).toBe('M00002');
        expect(wrapper.vm.$store.state.messageDialog.openConfirm.mock.calls[0][1]).toMatchObject([]);
        expect(wrapper.vm.$store.state.messageDialog.openConfirm.mock.calls[0][2]).toBeFalsy();
        
        expect(wrapper.vm.$axios.delete).toBeCalledWith('/joho/1');
        expect(wrapper.vm.dataList[wrapper.vm.activeTabIndex].data).toMatchObject([]);
    })

    it('select', () => {
        let selectedItem = {"id": "1", "name": "サンプル 名前1", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"};
        wrapper.vm.$router.push = jest.fn();

        wrapper.vm.select(selectedItem);
        let expected = {
            name:'shosai',
            params: {
                torokuJoho: selectedItem,
            }
        }
        expect(wrapper.vm.$router.push).toBeCalledWith(expected);
    })

    it('loadData', async () => {
        // データ読み込み済みの場合
        wrapper.vm.activeTabIndex = 0;
        wrapper.vm.dataList[0].data = [{"id": "2", "name": "サンプル 名前2", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"}];
        wrapper.vm.dataList[0].init = true;

        wrapper.vm.$axios.get.mockClear();
        wrapper.vm.loadData();
        await flushPromises();

        expect(wrapper.vm.$axios.get).not.toBeCalled();
        expect(wrapper.vm.dataList[0]).toMatchObject({
            data: [{"id": "2", "name": "サンプル 名前2", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"}],
            init: true
        });


        // データ読み込みしてない場合
        wrapper.vm.dataList[0].data = [];
        wrapper.vm.dataList[0].init = false;

        wrapper.vm.loadData();
        await flushPromises();

        expect(wrapper.vm.$axios.get).toBeCalledWith('/joho', {params:{mode: c.SearchMode.ALL}});
        expect(wrapper.vm.dataList[0]).toMatchObject({
            data: [{"id": "1", "name": "サンプル 名前1", "mailAddress": "sample1@example.com", "phoneNo": "09000000001", "torokuNichiji": "2020/01/01 01:00"}],
            init: true
        });
    })
})
