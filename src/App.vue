<template>
  <div id="app">
  	<div id="h1">
  		<span class="fa fa-bars" id="icon" @click="showMenu"></span>
  		<span slot="header" @click="hideMenu">{{items[index]}}</span>
  	</div>
  	<transition name="sideMenuAni">
  	<div id="sidemenu" @menuClick="hideMenu" v-show="showSideMenu">
	    <ul class="lists">
	    	<router-link v-for="(clist,index) in sideMenuLists" :to="clist.host" :key="clist.item">
	    		<li @click='hideMenuF(index)'>{{clist.item}}</li>
	    	</router-link>
	    </ul>
  	</div>
  	</transition>
  	<transition name="router">
  		<router-view></router-view>
  	</transition>
    
  </div>
</template>

<script>
import bus from "./bus.js";
export default {
  name: 'app',
  data:function(){
  	return {
  		value:false,
      visible:false,
      showSideMenu:false,
      items:['ONE一个','图文','阅读','音乐','问答','关于'],
      sideMenuLists:[
      								{host:"/index",item:"首页"},
      								{host:"/first",item:"图文"},
      								{host:"/second",item:"阅读"},
      								{host:"/third",item:"音乐"},
      								{host:"/question",item:"问答"},
      								{host:"/about",item:"关于"}
      							],
      index:0
  	}
  },
 	components:{
 		
 	},
 	mounted:function(){
 		bus.$on("menuClick",this.hideMenu);
 	},
  methods:{
    reqs(){
    	this.$http.get("/api/robot/index?info=你好&key=10bfeb0921434bf334516b8060956a21")
    	.then(function(res){
    	})
    },
    img(){
    	this.$http.get("../static/src/img.json")
    	.then(function(res){
    	})
    },

	  hideMenu:function(index){
  		this.showSideMenu = false;
  	},
  	showMenu:function(){
  		this.showSideMenu = true;
  	},
  	hideMenuF:function(index){
  		this.showSideMenu = false;
  		this.index = index;
  	}
  }
}
</script>

<style>
	#app{
		position: relative;
		overflow: hidden;
	}
	#h1{
		height: 50px;
		line-height: 50px;
		text-align: center;
		background-color: #1F2D3D;
		font-size: 20px;
		color: white;
	}
	#h1>ul{
		display: flex;
		height: 50px;
		padding: 0;
		list-style-type: none;
		font-size: 25px;
		float: left;
		flex-direction: column;
	}
	#icon{
		float: left;
		margin: 10px 0 0 8px;
		font-size: 30px;
	}
	#h1>ul>li{
		display: inline-block;
		height: calc(50px / 3);
	}
	#tab-bar{
		padding: 0;
		position: fixed;
		bottom: 0;
		width: 100%;
		list-style-type: none;
		display: flex;
		justify-content: space-around;
		height: 50px;
	}
	#sidemenu{
		position:absolute;
		background-color: #FFFFFF;
		height: calc(100vh - 50px);
		width: 200px;
		z-index: 10000;
		box-sizing: border-box;
		/*padding-right: calc(100vw - 200px);*/
	}
	.lists{
		padding: 0px;
		list-style-type: none;
	}
	.lists li{
		height: 35px;
		line-height: 35px;
		text-align: center;
		padding: 10px 10px;
		color: #666666;
	}
	.lists li:hover{
		background-color: #929292;
	}
	
	.sideMenuAni-enter-active,.sideMenuAni-leave-active{
		transition: all 0.5s;
	}
	.sideMenuAni-enter,.sideMenuAni-leave-active{
		opacity: 0;
		transform: translateX(-100%);
	}
	.router-enter-active, .router-leave-active {
	  transition: opacity .5s
  }
	.router-enter, .router-leave-active {
	  opacity: 0
  }
</style>
