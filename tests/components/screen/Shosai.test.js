import { shallowMount, createLocalVue } from '@vue/test-utils'
import Shosai from '@/components/screen/Shosai.vue'
import i18n from '@/i18n.js'

describe('詳細画面', () => {
	const localVue = createLocalVue();
	let wrapper;
    let mocks;
    let selectElementMock = jest.fn();

	beforeEach(() => {
		mocks = {
			$router: {
				push: function (){}
            },
			$route: {
				params: {}
            },
            $store: {
                dispatch: jest.fn()
            }
		}

		wrapper = shallowMount(Shosai, { 
			localVue,
			mocks,
            i18n
            
		});
	});

	it('activated', () => {
        jest.useFakeTimers();

        wrapper.vm.$refs = {mailDiv: 'maildiv'};
        let setTorokuJoho = jest.fn();
        let selectElement = jest.fn();
        wrapper.setMethods({ setTorokuJoho, selectElement });

        wrapper.vm.$options.activated[0].call(wrapper.vm);
        jest.runAllTimers();

        expect(selectElement).toBeCalledWith('maildiv');
        expect(setTorokuJoho).toBeCalled();
        expect(wrapper.vm.$store.dispatch).toBeCalledWith('SHOW_SIDE_MENU');
	})

	it('setTorokuJoho', async () => {

        wrapper.vm.$route.params = {};

        wrapper.vm.setTorokuJoho();

        expect(wrapper.vm.torokuJoho).toMatchObject({
            name: '',
            mailAddress: '',
            phoneNo: '',
            torokuNichiji: ''
        });

        let joho = {
            name: 'sample',
            mailAddress: 'sample-address',
            phoneNo: 'sample-no',
            torokuNichiji: '2020/03/11 00:12'
        };
        wrapper.vm.$route.params = {torokuJoho: joho};

        wrapper.vm.setTorokuJoho();

        expect(wrapper.vm.torokuJoho).toMatchObject(joho);
	})

	it('back', async () => {
        wrapper.vm.$router.push = jest.fn();

        wrapper.vm.back();

//        await flushPromises();

		expect(mocks.$router.push).toBeCalledWith({name: 'ichiran'});
	})
})
