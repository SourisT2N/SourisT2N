const form = document.querySelector(".form");
const inputs = form.querySelectorAll(".form-input");


form.addEventListener("submit", submitForm);
valueInput();

function submitForm (e) {
	let valueU;
	let valueP;
	Array.from(inputs).forEach(input =>{
		if(input.id == 'username'){
			valueU = input.value;
		}
		else valueP = input.value;
		checkValid(input)
	})
	if(valueU == 'admin' && valueP == 'admin'){
		backValueDefault()
		return true;
	}
	else if((valueU !== 'admin' || valueP !== 'admin') && (valueU.length > 0 || valueP.length > 0)) {
		form.querySelector("span").innerText = 'Vui lòng nhập đúng tài khoản admin' ;
	}
	e.preventDefault();
}


function backValueDefault(){
	Array.from(inputs).forEach(input =>{
		input.value = '';
	})
}

function valueInput () {
	Array.from(inputs).forEach(input =>{
		input.onblur = () => {
			checkValid(input)
		}

		input.oninput = () => {
			checkValid(input)
		}
	})
}

function checkValid (input) {
	const label = input.previousElementSibling;
	let check = true
	if(!input.value){
		label.classList.add("note");
		input.classList.add("danger");
		check = false
	}
	else {
		label.classList.remove("note");
		input.classList.remove("danger");
		check = true
	}
	return check;
}
