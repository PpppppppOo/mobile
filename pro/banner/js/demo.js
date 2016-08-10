function Banner(option){
	var position = option.position,
		option = option.option,
		arrAd;
	function createBanner(){
		var fragment = document.createDocumentFragment();
		arrAd = option.map(function(list,index){
			var ad = document.createElement("a");
			ad.title = list.name;
			ad.href = list.anchorHref;
			ad.style.backgroundImage = "url(" + list.imageUrl +")";
			fragment.appendChild(ad);
			return ad;
		});
		arrAd[0].classList.add("current");
		console.log(arrAd)
		position.appendChild(fragment);
	}
	function autoChange(){
		var adLen = option.length,
			index = 0,
			previousIndex = option.length - 1;
		setInterval(function(){
			index = index < option.length - 1 ? index + 1 : 0;
			previousIndex = index > 0 ? index - 1 : option.length - 1;
			arrAd[previousIndex].classList.add("previous");
			arrAd[previousIndex].classList.remove("current");
			arrAd[index].classList.remove("previous");
			arrAd[index].classList.add("current");
		}, 1000);
	}
	createBanner();
	autoChange();
}
var banner = document.querySelector(".banner");
ajax({
	url : "http://www.ikindness.cn/api/test/get",
	success : function(data){
		new Banner({
			position :banner,
			option : data.data
		});
	}
});
