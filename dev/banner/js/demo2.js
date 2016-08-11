function Banner(option){
	var position = option.position,
		option = option.option,
		arrad,
		previousIndex,
		currentIndex= 0;

	function createbanner(){
		var fragment = document.createDocumentFragment();
		arrad =option.map(function(list,index){
				console.log(option);
				var ad = document.createElement("a");
				ad.title = list.name;
				ad.href = list.anchorHref;
				ad.style.backgroundImage = "url(" + list.imageUrl + ")";
				fragment.appendChild(ad);
				return ad;
			});
			position.appendChild(fragment);

		}
		function setView(){
			arrad[previousIndex].classList.remove("current");
			arrad[previousIndex].classList.add("previous");
			arrad[currentIndex].classList.remove("previous");
			arrad[currentIndex].classList.add("current");

		}
		function autoChange(){
			var adLen = option.length;
			setInterval(function(){
				currentIndex = currentIndex < adLen -1 ? currentIndex+1 : 0;
				previousIndex = currentIndex >0 ? currentIndex-1 :adLen-1;
				setView();
			},2000);	
		}
		createbanner();
		autoChange();
}
var banner = document.querySelector(".banner");
ajax({
	url : "http://www.ikindness.cn/api/test/get",
	success : function(data){
		new Banner({
			position : banner,
			option : data.data

		});
	}
});