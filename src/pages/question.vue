<template>
	<div id="root" @click="openMenu">
		<div class="chart" ref="chart">
			<div class="robot">
				<p>
					<img src="../../static/src/timg.jpg"/><span>robot</span>
				</p>
				<span>你想问什么呀</span>
			</div>
			<div v-if="answers" v-for="text in answers">
				<div class="person">
					<p>
						<span>包子</span><img src="../../static/src/person.jpg"/>
					</p>
					<span>{{text.question}}</span>
				</div>
				<div class="robot">
					<p>
						<img src="../../static/src/timg.jpg"/><span>robot</span>
					</p>
					<span>{{text.answer}}</span>
				</div>
			</div>
		</div>
		<div class="input" @keydown.13="reqAnswer">
		  <el-input placeholder="内容不要超过30字呦" v-model="content" >
		    <template slot="append"><span class="fa fa-send" @click="reqAnswer"></span></template>
		    <el-button :plain="true">错误</el-button>
		  </el-input>
		</div>
	</div>
</template>

<script>
	import mixin from "../mix.js"
	export default {
		mixins: [mixin],
		data:function(){
			return {
				content:'',
				answers:[]
			}
		},
		methods:{
			reqAnswer:function(){
				if(!isNaN(this.content*1)){
					this.$message({
			          showClose: true,
			          message: '我看不懂数字的',
			          type: 'error'
			        });
					return
				}
				if(this.content.length>=30){
					this.$message({
			          showClose: true,
			          message: '我一次看不懂这么多数字',
			          type: 'error'
			        });
					return
				}
				this.$http.get("/api/robot/index?info="+this.content+"&key=10bfeb0921434bf334516b8060956a21")
				.then(function(res){
					if(!res.data.result){
						this.$message({
				          showClose: true,
				          message: '发现未知错误',
				          type: 'error'
				        });
						return
					}
					var a = {};
					a.answer=res.data.result.text;
					a.question=this.content;
					this.answers.push(a);
					this.content = "";
				}.bind(this),function(){
					this.$message({
			          showClose: true,
			          message: '网络信号不好',
			          type: 'error'
			        });
				}.bind(this))
			},
			one:function(){
				console.log(111)
			}
		},
		watch:{
			answers:function(){
					var a = 127 + this.$refs.chart.scrollHeight
					setTimeout(function(){
						this.$refs.chart.scrollTop = a
					}.bind(this),50)
			}
		}
	}
</script>

<style scoped>
	.chart{
		height: calc(100vh - 100px);
		background-color: #EFF2F7;
		overflow: scroll;
		padding: 8px;
		box-sizing: border-box;
	}
	.robot{
		margin-bottom: 10px;
	}
	.robot>p>img{
		height: 25px;
		width: 25px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.robot>p>span{
		height: 25px;
		line-height: 25px;
		display: inline-block;
		color: #9F9F9F;
		font-size: 14px;
		margin-left: 10px;
	}
	.person{
		text-align: right;
		margin-bottom: 10px;
	}
	.robot>span{
		display: inline-block;
		background-color: #58B7FF;
		border-radius: 5px;
		margin:0 25px;
		color: #FFFFFF;
		padding: 5px 10px;
		text-align: justify;
	}
	.person>p>img{
		height: 25px;
		width: 25px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.person>p>span{
		height: 25px;
		line-height: 25px;
		display: inline-block;
		color: #9F9F9F;
		font-size: 14px;
		margin-right: 10px;
	}
	.person>span{
		display: inline-block;
		background-color: #FFFFFF;
		border-radius: 5px;
		margin-right: 25px;
		color: #1F2D3D;
		padding: 5px 10px;
	}
	.input{
		margin-top: 10px;
	}
</style>