
//与index_aside的key(path)对应
const MainIndex = r => require.ensure([], () => r(require('@/components/view/main/index')), 'main_index');
const MainHelloWorld = r => require.ensure([], () => r(require('@/components/view/main/helloWorld')), 'main_hello_world');
const MainHelloWorld2 = r => require.ensure([], () => r(require('@/components/view/main/helloWorld2')), 'main_hello_world2');

const mainView = {
	'/main_index': MainIndex,
	'/main_index2': MainHelloWorld2,
	'/main_helloworld': MainHelloWorld,
}

export {
	mainView
}