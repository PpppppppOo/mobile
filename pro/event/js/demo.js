function setRem(){
	document.documentElement.style.fontSize = window.innerWidth / 20 +"px";
}
window.onresize = function(){
	setRem();
};
setRem();
var testTouch = document.querySelector(".testTouch"),
	span = testTouch.querySelector("span");
testTouch.addEventListener("touchstart",function(e){
	console.log("touchstart","x:"+e.touches[0].clientX + "; y;" + e.touches[0].clientY);
},0);
var touchY;
testTouch.addEventListener("touchmove",function(e){
	touchY = e.touches[0].clientY;
	console.log("touchmove","x:"+e.touches[0].clientX + "; y;" + touchY);
	if(touchY <= this.offsetHeight - span.offsetHeight && touchY >= 0){
	span.style.left = e.touches[0].clientX + "px";
	span.style.top = touchY+ "px";
	}
},0);
testTouch.addEventListener("touchend",function(e){
	// console.log("touchstart","x:"+e.changedtouches[0].clientX + "; y;" + e.changedTouches[0].clientY);
	span.classList.add("rotate");
},0);
span.addEventListener("animationstart" , function(e){
	this.innerHTML = this.innerHTML + "6";
},0);
span.addEventListener("animationend" , function(e){
	this.classList.remove("rotate");
	this.classList.add("scale");
},0);
span.addEventListener("transitionend",function(e){
	console.log(e);
	this.classList.remove("scale");
	this.innerHTML = this.innerHTML.substring(0,this.innerHTML.length - 1);
},0);

function ajax(option){
	function queryString(object){
		var result = [];
		for(var i in object){
			result.push(i + "=" + object[i] + "&");
		}
		return result.join("").replace(/&$/,"");
	}
	var xhr = new XMLHttpRequest();
		type = option.type,
		data = queryString(option.data);
	xhr.open(type || "get",option.url + (type === "get" ? +data : ""),option.asnyc || 1);
	option.data && type === "post" && xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		if(xhr.readyState ===4){
			var responseText = option.dataType && option.dataType === "text" ? xhr.responseText : JSON.parse(xhr.responseText);
			if(xhr.status === 200){
				typeof option.success === "function" && option.success(responseText);
			}else{
				typeof option.error === "function" && option.error(responseText);
			}
		}
	};
	xhr.send(data || null);
}
ajax({
	type : "post",
	url : "http://www.ikindness.cn/api/test/post",
	dataType : "text",
	data : {
		a : 2333,
		b : 666,
		c : "gg"
	},
	success : function(data){
		console.log(data);
	},
	error : function(err){
		console.log(err);
	}
});
