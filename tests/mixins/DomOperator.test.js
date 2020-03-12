import Vue from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils'
import DomOperator from '@/mixins/DomOperator';

describe('DOM操作部品', () => {
    const localVue = createLocalVue();
	let wrapper;

	beforeEach(() => {
        const Component = Vue.component('test-component', {
            name: 'test-component',
            data () {
              return {
              }
            },
            mixins: [DomOperator],
            template: '<div></div>'
        });

		wrapper = shallowMount(Component, { 
			localVue    
		});
	});

	it('selectElement', () => {
        const rangeMock = {
            selectNodeContents: jest.fn()
        }
        global.document.createRange = jest.fn(() => rangeMock);
        const selectionMock = {
            removeAllRanges: jest.fn(),
            addRange: jest.fn()
        }
        global.getSelection = jest.fn(() => selectionMock);

        let element = '<div></div>';
        wrapper.vm.selectElement(element);

        expect(global.document.createRange).toBeCalled()
        expect(rangeMock.selectNodeContents).toBeCalledWith(element)
        expect(global.getSelection).toBeCalled()
        expect(selectionMock.removeAllRanges).toBeCalled()
        expect(selectionMock.addRange).toBeCalledWith(rangeMock);
	})
})
