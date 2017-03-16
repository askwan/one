<template>
	<div id="root" @click="openMenu" @scroll="scrolling" ref="box">
		<ul class="card" v-for="music in musicList">
			<router-link :to="'/third/music/'+music.content_id">
				<li>-音乐-</li>
				<li>{{music.title}}</li>
				<li>文/{{music.author.user_name}}</li>
				<li>
					<img :src="music.img_url"/>
					<div>
						<div></div>
					</div>
				</li>
				<li>{{music.music_name}}|{{music.audio_author}}|{{music.audio_album}}</li>
				<li>{{music.forward}}</li>
				<li>{{music.date}}</li>
			</router-link>
		</ul>
		<el-table
		    v-loading="loading2"
		    element-loading-text="拼命加载中"
		    style="width: 100%">
		    <p>加载中...</p>
		</el-table>
	</div>
</template>

<script>
	import bus from "../bus.js"
	import mixin from "../mix.js"
	export default {
		mixins: [mixin],
		data:function(){
			return {
				musicList:[],
				loading2: true
			}
		},
		mounted:function(){
			this.loadingMusicList();
		},
		methods:{
			loadingMusicList:function(){
				this.$http.get("../static/src/music-list.json")
				.then(function(res){
					this.musicList=res.data.data
				}.bind(this))
			},
			loadingMore:function(){
				this.$http.get("../static/src/music-list.json")
		    	.then(function(res){
		    		this.musicList = this.musicList.concat(res.data.data);
		    	}.bind(this))
			},
			scrolling:function(){
				var a = this.$refs.box.scrollTop;
				var b = this.$refs.box.clientHeight;
				var c = this.$refs.box.scrollHeight;
				if(c-a-b==0){
					setTimeout(function(){
						this.loadingMore();
					}.bind(this),700)
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
	  	margin: 10px 0 10px 20px;
	  	font-weight: 100;
	  }
	  .card li:nth-of-type(3){
	  	color: #9F9F9F;
	  	margin: 0 0 10px 20px;
	  	font-size: 18px;
	  	font-weight: 100;
	  }
	  .card li:nth-of-type(4){
	  	margin: 0 80px;
	  	position: relative;
	  }
	  .card li:nth-of-type(4)>img{
	  	display: block;
	  	width: 100%;
	  	border-radius: 50%;
	  }
	  .card li:nth-of-type(4)>div{
	  	height: 20%;
	  	width: 20%;
	  	position: absolute;
	  	background-color: #9F9F9F;
	  	opacity: 0.5;
	  	top: 50%;
	  	left: 50%;
	  	border-radius: 50%;
	  	transform: translate(-50%,-50%);
	  }
	  .card li:nth-of-type(4)>div>div{
	  	background-color: #666666;
	  	height: 40%;
	  	width: 40%;
	  	border-radius: 50%;
	  	position: absolute;
	  	top: 50%;
	  	left: 50%;
	  	transform: translate(-50%,-50%);
	  }
	  .card li:nth-of-type(5){
	  	margin: 30px 10px 10px 10px;
	  	font-size: 16px;
	  	color: #9F9F9F;
	  }
	  .card li:nth-of-type(6){
	  	font-size: 16px;
	  	color: #9F9F9F;
	  	margin: 10px 0 25px 10px;
	  }
	  .card li:nth-of-type(7){
	  	font-size: 12px;
	  	color: #9F9F9F;
	  	margin: 10px 0 25px 10px;
	  }
</style>