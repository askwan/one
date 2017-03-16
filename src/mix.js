
import bus from "./bus.js";
export default {
	methods:{
		openMenu:function(){
			bus.$emit("menuClick");
		}
	}
}
