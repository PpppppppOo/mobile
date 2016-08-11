function Banner(option){
	var position = option.position,
		option = option.option,
		adLen = option.length,
		arrAd,
		arrButton,
		currentIndex=0,
		previousIndex = adLen -1 ,
		nextIndex = 1,
		bannerWidth;
	function createBanner(){
		var fragment = document.createDocumentFragment();
		arrAd = option.map(function(list,index){
			var ad = document.createElement("a");
			ad.title = list.name;
			ad.href = list.anchorHref;
			ad.style.backgroundImage = "url(" + list.imageUrl +")";
			fragment.appendChild(ad);
			var startX,
				endX,
				distance,
				direction;
			ad.addEventListener("touchstart",function(e){
				startX = e.touches[0].clientX;
			},0);
			ad.addEventListener("touchmove",function(e){
				nextIndex = currentIndex > adLen -1 ? 0 : currentIndex +1;
				distance = e.touches[0].clientX; - startX ;
				direction = distance > 0;
				this.style.left = distance + "px";
				if(direction){
					arrAd[nextIndex].style.left =distance - bannerWidth + "px" ;
				}else{
					arrAd[nextIndex].style.left =distance + bannerWidth + "px" ;
				}
				
			},0);
			ad.addEventListener("touchend",function(e){
				endX = e.changeTouches[0].clientX;
				if(Math.abs(distance)> bannerWidth / 2){
						this.classList.add(direction ? "ltr" : "rtl");
				}else{
					this.classList.add("init");
				}
				
			},0);
			ad.addEventListener("animationend",function(){
				this.style.left = null ;
				this.classList.remove("init");

			},0);
			return ad;
		});
		position.appendChild(fragment);
	}
	function createIndicator(){
		var indicator = document.createElement("div");
		indicator.className = "indicator";
		arrButton = option.map(function(list,index){
			var button = document.createElement("em");
			button.appendChild(document.createTextNode(index +1));
			indicator.appendChild(button);
			button.addEventListener("touchend",function(){
				previousIndex = currentIndex;
				currentIndex = index;
				setView();
				this.classList.add("current");
			},0);
			return button;
		});
		arrButton[0].classList.add("current");
		position.appendChild(indicator);
	}
	function setView(){
		arrAd[previousIndex].classList.remove("current");
		arrAd[previousIndex].classList.add("previous");
		arrAd[currentIndex].classList.remove("previous");
		arrAd[currentIndex].classList.add("current");
		arrButton[previousIndex].classList.remove("current");
		arrButton[currentIndex].classList.add("current");
	}
	function autoChange(){
		var adLen = option.length;
		setInterval(function(){
			currentIndex = currentIndex < adLen - 1 ? currentIndex + 1 : 0;
			previousIndex = currentIndex > 0 ? currentIndex - 1 : adLen - 1;
			
			setView();
			
		}, 4000);
	}
	createBanner();
	bannerWidth = arrAd
	createIndicator();
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
