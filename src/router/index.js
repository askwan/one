import Vue from 'vue'
import Router from 'vue-router'
import First from '../pages/first'
import Second from '../pages/second'
import Third from '../pages/third'
import Index from "../pages/index"
import Question from "../pages/question"
import About from "../pages/about"
import Article from "../pages/article"
import Music from "../pages/music"
Vue.use(Router)

var router = new Router({
  routes: [
    {
    	path:'/first',
    	component: First
    },{
    	path:'/second',
    	component: Second
    },{
    	path:'/third',
    	component: Third
    },{
    	path:"/index",
    	component:Index
    },{
    	path:"/question",
    	component:Question
    },{
    	path:"/about",
    	component:About
    },{
    	path:"/second/article/:id",
    	component:Article
    },{
    	path:"/third/music/:content_id",
    	component:Music
    }
  ]
})
router.push('/index')
export default router