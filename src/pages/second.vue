<template>
	<div id="root" @click="openMenu" @scroll="scrolling" ref="box">
		<ul class="card" v-for="art in articleList">
			<router-link :to="'/second/article/'+art.id">
				<li>-阅读-</li>
				<li>{{art.title}}</li>
				<li>文/{{art.author.user_name}}</li>
				<li><img :src="art.img_url" alt="" /></li>
				<li>{{art.forward}}</li>
				<li>{{art.date}}</li>
			</router-link>
		</ul>
		<el-table
		    v-loading="loading2"
		    element-loading-text="拼命加载中"
		    style="width: 100%">
		    <p>加载中</p>
		</el-table>
	</div>
</template>

<script>
	import bus from "../bus.js"
	import mixin from "../mix.js"
	export default {
		mixins: [mixin],
		data:function(){
			return{
				articleList:[],
				loading2: true
			}
		},
		mounted:function(){
			this.loadingArtList();
		},
		methods:{
			openMenu:function(){
				bus.$emit("menuClick");
			},
			loadingArtList:function(){
				this.$http.get('../static/src/article-list.json')
				.then(function(res){
					this.articleList = res.data.data
				}.bind(this))
			},
			loadingMore:function(){
				this.$http.get("../static/src/article-list.json")
		    	.then(function(res){
		    		this.articleList = this.articleList.concat(res.data.data);
		    	}.bind(this))
			},
			scrolling:function(){
				var a = this.$refs.box.scrollTop;
				var b = this.$refs.box.clientHeight;
				var c = this.$refs.box.scrollHeight;
				if(c-a-b==0){
					setTimeout(function(){
						this.loadingMore();
					}.bind(this),500)
				}
			}
		}
	}
</script>

<style scoped>
	.card{
		padding: 10px;
		list-style-type: none;
		border-bottom: 10px solid #F6F6F6;
	}
	.card li:nth-of-type(1){
	  	text-align: center;
	  	font-size: 16px;
	  	color: #666666;
	  	font-weight: 100;
	  	margin-top: 10px;
	  	
	  }
	  .card li:nth-of-type(2){
	  	font-size: 23px;
	  	color: #1F2D3D;
	  	margin: 10px 20px 10px 20px;
	  	font-weight: 100;
	  }
	  .card li:nth-of-type(3){
	  	color: #9F9F9F;
	  	margin: 0 0 10px 20px;
	  	font-size: 18px;
	  }
	  .card li:nth-of-type(4)>img{
	  	display: block;
	  	width: 100%;
	  }
	  .card li:nth-of-type(5){
	  	margin: 10px 10px;
	  	font-size: 16px;
	  	color: #9F9F9F;
	  }
	  .card li:nth-of-type(6){
	  	font-size: 12px;
	  	color: #9F9F9F;
	  	margin: 10px 0 25px 10px;
	  }
</style>