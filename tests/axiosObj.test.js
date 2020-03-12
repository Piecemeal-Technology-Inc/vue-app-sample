jest.mock('axios', () => {
    let axiosMock = {
        requestInterceptor : jest.fn(),
        responseInterceptor : jest.fn(),
        create: jest.fn(() => {
            return {
                interceptors: {
                    request: {
                        use: axiosMock.requestInterceptor
                    },
                    response: {
                        use: axiosMock.responseInterceptor
                    }
                }
            }
        })
    }
    return axiosMock;
});

jest.mock('@/store', () => {
    return {
        dispatch: jest.fn(),
        state: {
            loadingDialog: {
                open: jest.fn(),
                close: jest.fn()
            },
            messageDialog: {
                openError: jest.fn()
            }
        }
    }
});

describe('axiosObj.js（Axiosオブジェクト設定）', () => {

    afterAll(() => {
        jest.resetModules();
    })

    it('Axiosオブジェクト', async () => {
        jest.resetModules();

        process.env.VUE_APP_API_BASE_URL = '/base';

        await import('@/axiosObj');
        let axios = await import('axios');

        expect(axios.default.create).toBeCalledWith({
            baseURL: '/base'
        });

        expect(axios.default.requestInterceptor).toBeCalled();
        expect(axios.default.responseInterceptor).toBeCalled();

    })

    it('リクエストインターセプタ―', async () => {
        jest.resetModules();

        await import('@/axiosObj');
        let axios = await import('axios');
        let store = await import('@/store');

        let requestInterceptor = axios.default.requestInterceptor.mock.calls[0][0];

        let request = 'request';
        let actual = requestInterceptor(request);

        expect(store.default.state.loadingDialog.open).toBeCalled();
        expect(actual).toBe('request');
    })

    it('レスポンスインターセプタ―（正常）', async () => {
        jest.resetModules();

        await import('@/axiosObj');
        let axios = await import('axios');
        let store = await import('@/store');

        let responseInterceptor = axios.default.responseInterceptor.mock.calls[0][0];

        let response = 'response';
        let actual = responseInterceptor(response);

        expect(store.default.state.loadingDialog.close).toBeCalled();
        expect(actual).toBe('response');
    })

    it('レスポンスインターセプタ―（異常）', async () => {
        jest.resetModules();

        await import('@/axiosObj');
        let axios = await import('axios');
        let store = await import('@/store');

        let responseErrorInterceptor = axios.default.responseInterceptor.mock.calls[0][1];

        let error = {
            response: {
                status: 500
            }
        };

        global.Promise.reject = jest.fn(() => new Promise(() => {}));

        let actual = responseErrorInterceptor(error);

        expect(store.default.state.loadingDialog.close).toBeCalled();
        expect(store.default.state.messageDialog.openError).toBeCalledWith(
            'M00001',
            [500]
        );

        expect(global.Promise.reject).toBeCalledWith(error);
        expect(actual instanceof Promise).toBeTruthy();


        store.default.state.loadingDialog.close.mockClear();
        store.default.state.messageDialog.openError.mockClear();
        global.Promise.reject.mockClear();

        error = {}
        actual = responseErrorInterceptor(error);

        expect(store.default.state.loadingDialog.close).toBeCalled();
        expect(store.default.state.messageDialog.openError).toBeCalledWith(
            'M00001',
            ['none']
        );

        expect(global.Promise.reject).toBeCalledWith(error);
        expect(actual instanceof Promise).toBeTruthy();
	})
})
