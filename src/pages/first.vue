<template>
	
	<div id="root" @click="openMenu" @scroll="scrolling" ref="box">
		<transition name="share">
			<share v-show="isShow"></share>
		</transition>
		
		<ul class="card" v-for="list in imgLists" @closeShow="closeShare">
			<li>{{list.date}}</li>
			<li>{{list.id}}</li>
			<li>
				<img :src="list.img_src" />
			</li>
			
			<li>{{list.category}}</li>
			<li>{{list.content}}</li>
			<span class="shdd">
				<i class="el-icon-edit" @click="shareClick"></i>&nbsp;
				<i class="el-icon-star-on" @click="shareClick"></i>&nbsp;
				<i class="el-icon-share" @click="shareClick"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			</span>
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
	import share from "../components/Share"
	export default {
		mixins: [mixin],
		components:{
			share
		},
		data:function(){
			return {
		      isLoaded:false,
		      imgLists:[],
		      loading2: true,
		      isShow:false
		    };
		},
		mounted:function(){
			this.requestImg();
			bus.$on("closeShow",this.closeShare);
		},
		methods:{
			requestImg:function(){
				this.$http.get("../static/src/img.json")
		    	.then(function(res){
		    		this.imgLists = res.data.data;
		    	}.bind(this))
		    	this.$http.get("/one/one/ajaxlist/0?_token=892c26b1bd7fa6a5b04affd1f4abd4887039c451")
		    	.then(function(res){
		    		console.dir(res)
		    	}.bind(this))
			},
			loadingMore:function(){
				this.$http.get("../static/src/img.json")
		    	.then(function(res){
		    		this.imgLists = this.imgLists.concat(res.data.data);
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
			},
			shareClick:function(){
				this.isShow = true;
			},
			closeShare:function(){
				this.isShow = false;
			}
		}
		
	}
</script>

<style scoped>
	
	  
	  .card{
	  	list-style-type: none;
	  	padding: 0;
	  	border-bottom: 10px solid #F6F6F6;
	  }
	  .card>li:nth-of-type(1){
	  	text-align: center;
	  	font-size: 23px;
	  	color: #666666;
	  	font-weight: 100;
	  	margin-top: 20px;
	  }
	  .card>li:nth-of-type(2){
	  	text-align: center;
	  	font-size: 12px;
	  	color: #9797A3;
	  	margin: 10px 0;
	  }
	  .card>li:nth-of-type(3)>img{
	  	display: block;
	  	width: 100%;
	  }
	  .card>li:nth-of-type(4){
	  	text-align: center;
	  	color: #9797A3;
	  	font-size: 12px;
	  	margin: 10px 0;
	  }
	  .card>li:nth-of-type(5){
	  	color: #AAAAAA;
	  	padding: 0 30px;
	  	text-align: justify;
	  	margin-bottom: 50px;
	  }
	  .shdd{
	  	color: #666666;
	  	display: block;
	  	width: 100%;
	  	text-align: right;
	  	margin-bottom: 20px;
	  }
	  .shdd i{
	  	font-size: 14px;
	  }
	  .share-enter-active, .share-leave-active {
		  transition: opacity .5s
	  }
		.share-enter, .share-leave-active {
		  opacity: 0
	  }
	  
	
</style>