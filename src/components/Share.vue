<template>
	<div id="box" @click="closeShow">
		<h1>分享</h1>
		<ul class="share-box">
			<el-button  type="text" @click="openCorfirm('QQ好友')" >
				<li></li>
			</el-button>
			<el-button type="text" @click="openCorfirm('QQ空间')">
				<li></li>
			</el-button>
			<el-button type="text" @click="openCorfirm('朋友圈')">
				<li></li>
			</el-button>
			<el-button type="text" @click="openCorfirm('微信')">
				<li></li>
			</el-button>
		</ul>
	</div>
</template>

<script>
	import bus from "../bus.js"
	export default {
		data:function(){
			return {
				value1:'QQ好友',
				value2:"QQ空间",
				value3:"微信",
				value4:"朋友圈"
			}
		},
		methods:{
			closeShow:function(){
//				console.log(111)
				bus.$emit("closeShow")
			},
			openCorfirm:function(msg){
//				console.dir(index)
				this.$alert('分享至'+msg, '分享', {
		          confirmButtonText: '确定',
		          showCancelButton: true,
		          cancelButtonText:"取消",
		          callback: (action,instance, done) => {
		          	if(action=="confirm"){
		          		this.$message({
			              type: 'success',
			              message: "分享成功"
			            });
		          	}
		            
		          }
		        });
				
			}
		}
	}
</script>

<style scoped>
	h1{
		font-weight: 100;
		text-align: center;
		margin-top: 30px;
	}
	#box{
		background-color: #FFFFFF;
		position: absolute;
		top: 0;
		height: 100vh;
		width: 100vw;
	}
	.share-box{
		margin-top: 20px;
		padding: 0;
		height: 60vh;
		list-style-type: none;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.share-box li{
		height: 60px;
		width: 90px;
		color: rgba(0,0,0,0);
		background-image: url(../../static/src/share-min.jpg);
		background-size: 900% 600%;
	}
	.share-box>.el-button:nth-of-type(1) li{
		
		background-position:-63.5% 0;
	}
	.share-box>.el-button:nth-of-type(2) li{
		background-position:-63.5% 18.5%;
	}
	.share-box>.el-button:nth-of-type(3) li{
		background-position:-63.5% 38.5%;
	}
	.share-box>.el-button:nth-of-type(4) li{
		background-position:-63.5% 58.5%;
	}
</style>