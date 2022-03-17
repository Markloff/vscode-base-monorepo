/// @ts-expect-error
import GoodsImageComponent from './components/GoodsImageComponent.vue';

export type Foo = 'foo1';

export default class GoodsImageBlock {
	ctx: any;

	constructor(options) {
		setTimeout(() => {
			console.log(options.ctx?.process.invoke('getShopInfo', ['XingFu']));
		}, 2000);
		this.store;
	}

	static components = {
		GoodsImageComponent,
	};
}

