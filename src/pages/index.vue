<template>
	<div id="root" @click="openMenu" v-if="isLoaded">
		<el-button
		    type="primary"
		    v-loading.fullscreen.lock="fullscreenLoading"
		    style="display:none"
		    >
		</el-button>
		<img :src="imgMsg.img_src" @load="openFullScreen" class="load"/>
		<div id="box" :style="{backgroundImage:'url('+imgMsg.img_src+')'}">
			<ul id="content">
				<li>{{date}}</li>
				<li>{{imgMsg.id}}|Mar.2017</li>
				<li>{{imgMsg.content}}</li>
				<li><span class="fa fa-angle-down"></span></li>
			</ul>
		</div>
		
		  <ul class="text">
		    <li>阅读</li>
		    <li>{{readMsg.title}}</li>
		    <li>作者/{{readAuthor}}</li>
		   	<li class="clist">{{readMsg.forward}}</li>
		   	<li class="clist"></li>
		   	<router-link :to="'/second/article/'+readMsg.id"><li class="last">阅读全文</li></router-link>
		  </ul>
		  <ul class="text">
		    <li>音乐</li>
		    <li>{{musicMsg.title}}</li>
		    <li>{{musicAuthor}}</li>
		   	<li class="clist"></li>
		   	<li class="clist">{{musicMsg.forward}}</li>
		   	<!--<router-link :to="'/second/article/'+readMsg.id"><li class="last">阅读全文</li></router-link>-->
		  </ul>
		  <div class="btn">		  	
		  	<router-link to="/first">
		  		<el-button :plain="true" type="info">加载更多</el-button>
		  	</router-link>
		  </div>
	</div>
</template>

<script>
	import bus from "../bus.js"
	export default {
		mounted:function(){
//			this.openFullScreen();
			this.loadingImg();
		},
		data:function(){
			return {
				imgMsg:{},
				readMsg:{},
				musicMsg:{},
				readAuthor:'',
				musicAuthor:'',
				date:1,
				isLoaded:false,
				fullscreenLoading: true
			}
		},
		methods:{
			openMenu:function(){
				bus.$emit("menuClick");
				
			},
			loadingImg:function(){
				var date = new Date()
				this.date = date.getDate()
				this.$http.get("../static/src/img.json")
		    	.then(function(res){
		    		var a = res.data.data.length;
		    		a=Math.floor(Math.random()*a)
		    		this.imgMsg = res.data.data[a]
		    		
		    	}.bind(this));
		    	this.$http.get('../static/src/article-list.json')
				.then(function(res){
					var a = res.data.data.length;
		    		a=Math.floor(Math.random()*a);
		    		this.readMsg = res.data.data[a];
		    		this.readAuthor = res.data.data[a].author.user_name
				}.bind(this));
				this.$http.get('../static/src/music-list.json')
				.then(function(res){
					var a = res.data.data.length;
		    		a=Math.floor(Math.random()*a)
		    		this.musicMsg = res.data.data[a];
		    		this.musicAuthor = res.data.data[a].author.user_name
				}.bind(this))
				this.isLoaded = true;
			},
			openFullScreen() {
		          this.fullscreenLoading = false;
		    }
			
		}
	}
</script>

<style scoped>
	#box{
		height: calc(100vh - 50px);
		background-image: url(http://image.wufazhuce.com/FvklDEUrKO0xA-_-IT_522HVFe7W);
		background-size: 100% 100%;
		position: relative;
	}
	.load{
		display: none;
	}
	#content{
		padding:0 20px;
		color: white;
		list-style-type: none;
		position: absolute;
		bottom: 0;
		width: calc(100% - 40px);
	}
	#content>li:nth-of-type(1){
		font-size: 50px;
	}
	#content>li:nth-of-type(2){
		font-size: 20px;
	}
	#content>li:nth-of-type(3){
		font-size: 16px;
		text-align: justify;
		line-height: 26px;
		text-overflow: ellipsis;
		overflow: hidden;
		font-family: "PingFang SC", sans-serif;
	}
	#content>li:nth-of-type(4){
		height: 50px;
		line-height: 50px;
		font-size: 50px;
		text-align: center;
		font-weight: 700;
		margin: 0 auto;
	}
	.text {
	    font-size: 14px;
	    list-style-type: none;
	    padding: 10px;
	  }
	  
	.text>li:nth-of-type(1){
		color:#A8C2E8;
		line-height: 25px;
	}
	.text>li:nth-of-type(2){
		font-size: 20px;
		margin: 5px 0 20px 0;
	}
	.text>li:nth-of-type(3){
		font-size: 25px;
		color: #929292;
		font-size: 14px;
		margin: 10px 0;
	}
	.clist{
		color: #929292;
		font-size: 14px;
		white-space:nowrap;/* 不换行 */
		overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
		text-overflow:ellipsis;
		line-height: 30px;
	}
	.last{
		color: #A8C2E8;
		font-size: 16px;
		margin: 30px 0 30px 0;
	}
	.btn{
		text-align: center;
		margin: 80px 0;
	}
</style>