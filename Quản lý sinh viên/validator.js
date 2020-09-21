const form = document.querySelector(".form");
const inputs = form.querySelectorAll(".form-input");
Array.from(inputs).forEach(input => {
  input.addEventListener("blur",checkValue);
  input.addEventListener("input",checkValue);
});

function checkValue () {
  let error;
  if(this.id == 'name'){
    error = checkName(this);
    checkError(this,error);
  }
  else if(this.id == 'address'){
    error = checkAddress(this);
    checkError(this,error);
  }
  else if(this.id == 'code'){
    error = checkCode(this);
    checkError(this,error);
  }
}


function checkError(selector,error){
  const label = selector.previousElementSibling;
  if(error){
    displayError(label,selector,error);
  }
  else {
    displayHideError(label,selector,error);
  }
}

function displayError (label,selector,error) {
  const icon = getParent(label,'.form-group').querySelector(".error-group");
  const content = icon.querySelector(".errorM");
  label.classList.add("warning");
  selector.classList.add("danger");
  icon.classList.add("out");
  content.classList.remove("opacity");
  content.querySelector("span").innerText = error;
  const timeout = setTimeout(() => {
    content.classList.add("opacity");
  },5000)
}

function displayHideError (label,selector,error) {
  const icon = getParent(label,'.form-group').querySelector(".error-group");
  label.classList.remove("warning");
  selector.classList.remove("danger");
  icon.classList.remove("out");
}

function checkName (selector) {
  const format = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|]+$/
  const value  = selector.value.trim();
  const check = format.test(value.toLowerCase());
  if(value.length < 6) {
    return 'Tên Không Được Dưới 6 Ký Tự';
  }
  else if(!check){
    return 'Tên Chỉ Được Chứa Các Ký Tự Chữ';
  }
  else return undefined

}

function checkAddress(selector) {
  const format = /^(\d+[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|]+[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|])+$/;
  const value = selector.value.trim();
  const check = format.test(value.toLowerCase());
  if(value.length < 7){
    return 'Địa Chỉ Không Được Dưới 7 Ký Tự';
  }
  else if(!check){
    return 'Địa Chỉ,Chứa Các Ký Tự Chữ Và Số';
  }
  else return undefined
}

function checkCode(selector) {
  const format = /^\d+$/;
  const value = selector.value.trim();
  const check = format.test(value.toLowerCase());
  if(value.length < 8 || value.length >= 9) {
    return 'Mã Số Sinh Viên Chỉ Chứa 8 Ký Tự';
  }
  else if(!check) {
    return 'Mã Số Sinh Viên Chỉ Được Chứa Các Ký Tự Số';
  }
  else return undefined;
}
