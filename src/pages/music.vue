<template>
	<div id="root" @click="openMenu">
		<cont1601 v-if="1601==contId"></cont1601>
		<cont1608 v-if="1608==contId"></cont1608>
		<cont1607 v-if="1607==contId"></cont1607>
		<cont1600 v-if="1600==contId"></cont1600>
		<cont1597 v-if="1597==contId"></cont1597>
		<cont1598 v-if="1598==contId"></cont1598>
		<cont1596 v-if="1596==contId"></cont1596>
		<cont1592 v-if="1592==contId"></cont1592>
		<cont1603 v-if="1603==contId"></cont1603>
		<cont1590 v-if="1590==contId"></cont1590>
	</div>
</template>

<script>
	import mixin from "../mix.js"
	import cont1601 from "../components/1601"
	import cont1608 from "../components/1608"
	import cont1607 from "../components/1607"
	import cont1600 from "../components/1600"
	import cont1597 from "../components/1597"
	import cont1598 from "../components/1598"
	import cont1596 from "../components/1596"
	import cont1592 from "../components/1592"
	import cont1603 from "../components/1603"
	import cont1590 from "../components/1590"
	export default {
		mixins: [mixin],
		mounted:function(){
			this.contId = this.$route.params.content_id
		},
		data:function(){
			return {
				content:"",
				contId:0
			}
		},
		components:{
			cont1601,
			cont1608,
			cont1607,
			cont1600,
			cont1597,
			cont1598,
			cont1596,
			cont1592,
			cont1603,
			cont1590
		},
		methods:{
			loaded:function(){
				console.dir(this.$route.params.content_id)
			}
		}
	}
</script>

<style scoped>
</style>