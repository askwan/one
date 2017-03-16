<template>
	<div id="root" @click="openMenu">
		<article class="content">
			<h2>{{article.title}}</h2>
			<p>{{article.author}}</p>
			<p v-if="article.forward">{{article.forward}}</p>
			<section v-for="text in article.article">{{text}}</section>
		</article>
	</div>
</template>

<script>
	import mixin from "../mix.js"
	export default {
		mixins: [mixin],
		data:function(){
			return {
				article:{}
			}
		},
		mounted:function(){
//			console.log(this.$route.params.id);
			this.loadingArticle();
			
		},
		methods:{
			loadingArticle:function(){
				this.$http.get("../static/src/"+this.$route.params.id+".json")
				.then(function(res){
//					console.dir(res.data)
					this.article = res.data
				}.bind(this))
			}
		}
	}
</script>

<style scoped>
	.content{
		padding: 16px;
		margin-bottom: 150px;
	}
	h2{
		font-weight: 100;
		margin-top: 30px;
		margin-bottom: 20px;
	}
	.content p:nth-of-type(1){
		color: #8F8F8F;
		height: 20px;
		line-height: 20px;
		font-size: 13px;
	}
	.content p:nth-of-type(2){
		font-size: 15px;
		text-align: justify;
		/*height: 25px;*/
		line-height: 25px;
		color: #8F8F8F;
	}
	.content section{
		color: #666666;
		font-size: 17px;
		line-height: 30px;
		margin: 20px 0;
		font-weight: 100;
		text-align: justify;
	}
</style>