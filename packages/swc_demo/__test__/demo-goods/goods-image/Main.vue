<template>
	<view class='image-block'>
		hello world233
		<child />
		<goods-image-widget />
		<goods-image-component />
		5555
		<image class='image-block__image' :src='url[0]' @click='onClick' />
	</view>
</template>

<script>

export default {
	data() {
		this.store = this.ctx.getParentExtensionInstanceStore();
		return {
			url: [
				'https://img.yzcdn.cn/upload_files/2019/05/27/FpqhXfOHGp-HKrjFdGiU8PiQ0Kg3.jpg',
			],
		};
	},
	mounted() {
		this.ctx.watch('imgList', (val) => {
			this.url = val;
		});
	},
	methods: {
		onClick() {
			this.ctx.event.emit('clickImage');
		},
	},
};
</script>

<style lang='scss' scoped>
.image-block {
	position: relative;

	&__image {
		display: block;
		width: 100%;
		height: 250px;
	}
}
</style>
