<template>
	<div id="root" @click="openMenu">
		<div class="icon">
			<img src="../../static/src/icon.jpg"/>
			<p>请下载正版</p>
		</div>
	</div>
</template>

<script>
	import mixin from "../mix.js"
	export default {
		mixins: [mixin]
	}
</script>

<style scoped>
	.icon img{
		width: 100%;
		text-align: center;
		margin-top: 150px;
		
	}
	#root{
		background-color: #F6F6F6;
		
	}
	p{
		text-align: center;
		color: #9F9F9F;
		font-size: 14px;
	}
</style>