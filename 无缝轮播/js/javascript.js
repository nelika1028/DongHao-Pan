var boxin = document.getElementsByClassName("box-in");
var a = document.getElementsByClassName("box")[0].childNodes[3].childNodes;  //获取ol里的li标签集合
var btn_left = document.getElementById("btn-left");
var btn_right = document.getElementById("btn-right");
var key = 0;
//转换left值
function left(){
	boxin[0].style.transitionProperty = "left";
	boxin[0].style.left = key*(-400)-400+""+"px";
	//左无缝
	if(key == 4){
			function fun1(){
				boxin[0].style.transitionProperty = "none";
				key = 0;
				boxin[0].style.left = "-400px";	
			}
			setTimeout(fun1,900);
		}
	//右无缝
	if(key == -1){
			function fun2(){
				boxin[0].style.transitionProperty = "none";
				key = 3;
				boxin[0].style.left = "-1600px";	
			}
			setTimeout(fun2,900);
		}
}

a[0].onclick = function (){
	key = 0;
	left();
}
a[1].onclick = function (){
	key = 1;
	left();
}
a[2].onclick = function (){
	key = 2;
	left();
}
a[3].onclick = function (){
	key = 3;
	left();
}
btn_left.onclick = function(){
	key--;
	left();
}
btn_right.onclick = function(){
	key++;
	left();
}
function fun3(){
	key++;
	left();
}
setInterval(fun3,5000);
