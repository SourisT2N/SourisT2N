const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
var btn = document.querySelector("main .container1 .btn");
var span = document.querySelector("main .container1 h2 span")
var click = document.querySelectorAll("nav .nav-center .nav-links li span");
var count = 0
for(let i = 0;i<click.length;i++){
	click[i].onclick = () =>{
		for(let i = 0;i<click.length;i++){
			click[i].classList.remove("ad")
		}
		
		click[i].classList.add("ad");
		if(click[i].innerText == "Hex"){
			document.querySelector("main .container1").classList.add("active");
			
			if(count == 0){
				count = 1;
				var add = "#"
	for(let i = 0;i<6;i++){
		add += hex[random()];
	}
	
	document.body.style.backgroundColor = add;
	span.innerText = add;

			}
		}
		else {
			count = 0
			document.body.style.backgroundColor = "#F1F5F8"
			document.querySelector("main .container1").classList.remove("active");
		}
	}
}
btn.onclick = () => {
	var add = "#"
	for(let i = 0;i<6;i++){
		add += hex[random()];
	}
	document.body.style.backgroundColor = add;
	span.innerText = add;
}
// window.onload = () => {
// 	var add = "#"
// 	for(let i = 0;i<6;i++){
// 		add += hex[random()];
// 	}
// 	document.body.style.backgroundColor = add;
// 	span.innerText = add;
// }
function random(){
	return Math.floor(Math.random()*hex.length)
}