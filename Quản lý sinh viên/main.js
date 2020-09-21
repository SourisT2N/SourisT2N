const tbody = document.querySelector("tbody");
const clearBtn = document.querySelector(".clear-btn");
const submitBtn = document.querySelector(".btn.add-btn");
const cancelBtn = document.querySelector(".btn.add-local");
let editElement;
let elementEdit;
let checkTt = false;
let count = 0;
let obj = {};
let nutEdit = 0;
const objCheck = [0,1,2,3,4,5,6,7,8,9,'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
const lengthObjCheck = objCheck.length;
 // Các Sự Kiện
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItem);
window.addEventListener("DOMContentLoaded",loadLocalStorage);


// function Important

function loadTableAgain () {
	const trTable = document.querySelectorAll(".add #table1 tbody tr");
	if(trTable) {
		trTable.forEach(tr => {
			tr.style.display = 'table-row'
		})
	}
}

// Thêm Item
function addItem (e) {
	e.preventDefault();
	const id = new Date().getTime();
	const obj = arrValue();
	if(obj){
		scanCreateElement(obj,id);
	}
	else {
		if(!checkTt) {
			let random = [];
			for(let i = 0;i < 6;i++){
				random.push(objCheck[Math.floor(Math.random()*lengthObjCheck)]);
			}
			let value = prompt(`MSSV Bị Trùng Có Muốn Tiếp Tục Thêm Không?\rNhập ${random.join('')} để tiếp tục.`);
			if(value !== null){
				if(value.trim().toLowerCase() === random.join('')){
					arr.push(arr[arr.length - 1])
					scanCreateElement(arr[arr.length - 1],id);
				}
			}
		}
		else if(checkTt && countEdit == 0) {
			alert("Thông Tin Bạn Vừa Sửa Trùng Với Những Thông Tin Trước.\rVui Lòng Kiểm Tra Lại.");
		}
		else if(checkTt && countEdit == 1) {
			alert("Thông Tin Bạn Sửa Có Mã Sinh Viên Trùng Với Những Thông Tin Trước.\rVui Lòng Kiểm Tra Lại.");
		}
	}
}

// Kiểm Tra Trước Khi Thêm
function scanCreateElement (obj,id) {
	let checked = checkValueCreate(obj);
	if(checked && !checkTt){
		createNewElement(obj,id);
		addLocalStorage(obj,id);
	}
	else if(checked && checkTt){
		for(let i = 0;i < editElement.length;i++){
			if(i == 0) {
				editElement[i].innerText = obj.name;
			}
			else if(i == 1) {
				editElement[i].innerText = obj.address;
			}
			else {
				editElement[i].innerText = obj.code;
			}
		}
		const idEdit = elementEdit.getAttribute('data-id');
		clearBtn.classList.remove("hide");
		cancelBtn.classList.remove("display");
		arr[nutEdit] = obj;
		loadTableAgain();
		editLocalStorage(idEdit,obj);
		backDefaultValue()
	}
	else {
		Array.from(inputs).forEach(item => {
			const label = item.previousElementSibling;
			if(item.id == 'name' && checkName(item)){
				const errorMessage = checkName(item);
				displayError(label,item,errorMessage);
			}
			else if(item.id == 'address' && checkAddress(item)){
				const errorMessage = checkAddress(item);
				displayError(label,item,checkName(item));
			}
			else if(item.id == 'code' && checkCode(item)){
				const errorMessage = checkCode(item);
				displayError(label,item,errorMessage);
			}
		})
		arr.splice(arr.length - 1,1);
	}
}

// Kiểm Tra Mã Sinh Viên Có Bị Trùng Không Rồi Lọc Lấy Giá Trị
function arrValue () {
	const obj = Array.from(inputs).reduce((sum,input) => {
		sum[input.id] = input.value;
		return sum;
	}
	,{});
	if(arr.length > 0 && !checkTt){
		for(let i = 0;i < arr.length;i++){
			const test = arr[i].name && arr[i].address && arr[i].code;
			let checkObj = [];
			if(test){
				Array.from(inputs).forEach(input => {
					if(input.id == 'name') {
						checkObj.push(checkName(input))
					}
					else if(input.id == 'address') {
						checkObj.push(checkAddress(input))
					}
					else if(input.id == 'code') {
						checkObj.push(checkCode(input))
					}
				})
				checkObj = checkObj.every(item => !item);
				if(checkObj && arr[i].code == obj.code)
					return undefined;
			}
		}
	}
	if(!checkTt){
		arr.push(obj);
	}
	else{
		for(let i = 0;i < arr.length;i++){
			if(arr[i].code == obj.code && arr[i].name == obj.name && arr[i].address == obj.address){
				countEdit = 0;
				return undefined;
			}
			else {
				for(let j = 0;j < arr.length - 1;j++){
					if(j > 0 && arr[j].code == obj.code) {
						countEdit = 1;
						return undefined;
					}
				}
			}
		}
	}
	return obj;
}

// Tạo Mới Element Và Thêm Vào HTML
function createNewElement(obj,id){
	count++;
	loadTableAgain();
	const element = document.createElement("tr");
	const att = document.createAttribute("data-id");
	att.value = id;
	element.setAttributeNode(att);
	element.classList.add("trtable");
	element.innerHTML = `<td>${count}</td>
						<td name="tdtable" id="nameTable">${obj.name}</td>
						<td name="tdtable">${obj.address}</td>
						<td name="tdtable" id="codeTable">${obj.code}</td>
						<td class="fixed">
						<button type="button" class="edit-btn">
							<i class="fas fa-edit"></i>
						</button>
						<!-- delete btn -->
						<button type="button" class="delete-btn">
							<i class="fas fa-trash"></i>
						</button>
						</td>
	        </div>
						`;
	tbody.appendChild(element);
	tbody.classList.add("add");
	backDefaultValue();
	const editBtn = element.querySelector(".edit-btn");
	editBtn.addEventListener("click", editItem);
	const deleteBtn = element.querySelector(".delete-btn");
	deleteBtn.addEventListener("click", deleteItem);
}




// lấy parent element
function getParent (element,selector) {
	while(element.parentElement){
		if(element.parentElement.matches(selector)){
			return element.parentElement;
		}
		else element = element.parentElement;
	}
}

function backDefaultValue () {
	checkTt = false;
	submitBtn.innerText = 'Thêm Sinh Viên';
	Array.from(inputs).forEach(input => input.value = '');
}

function newValue () {
	checkTt = true;
	submitBtn.innerText = 'Sửa Thông Tin';
}

// Sự Kiện Xóa Tất Cả element
function clearItem () {
	const itemsClear = document.querySelectorAll(".add table tbody tr");
	localStorage.clear();
	if(itemsClear.length > 0){
		Array.from(itemsClear).forEach(item => {
			item.remove();
		})
		arr = [];
		count = 0;
		countEdit = 0;
		editElement = undefined;
		backDefaultValue();
	}
	else alert("Chưa Có Sinh Viên Để Tạo Mới Dữ Liệu");
}

function editItem () {
	clearBtn.classList.add("hide");
	cancelBtn.classList.add("display");
	cancelBtn.onclick = () => {
		cancelBtn.classList.remove("display");
		clearBtn.classList.remove("hide");
		backDefaultValue();
	};
	elementEdit = getParent(this,'tr');
	let previousElement = elementEdit;
	editElement = elementEdit.querySelectorAll("td[name='tdtable']");
	for(nutEdit = 0;previousElement = previousElement.previousElementSibling;nutEdit++){};
	const lengthInner = editElement.length;
	for(let i = 0;i < lengthInner;i++) {
		inputs[i].value = editElement[i].innerText;
	}
	newValue()
}

function deleteItem () {
	if(!checkTt) {
		const itemDelete = getParent(this,'tr');
		const id = itemDelete.getAttribute("data-id");
		let replacer =  itemDelete;
		let counters = 0;
		for(counters = 0;replacer = replacer.previousElementSibling;counters++){};
		arr.splice(counters,1);
		count--;
		itemDelete.remove();
		removeLocalStorage(id);
		loadTableAgain();
	}
	else {
		alert("Vui Lòng Chỉnh Sửa Thông Tin Trước Khi Xóa");
	}
}

function checkValueCreate (obj) {
	let filterKey = [];
	let checked = [];
	for(let key in obj){
		filterKey.push(document.getElementById(key));
	}
	for(let i = 0;i < filterKey.length;i++){
		if(i == 0){
			checked.push(checkName(filterKey[i]));
		}
		else if(i == 1){
			 checked.push(checkAddress(filterKey[i]));
		}
		else if(i == 2){
			checked.push(checkCode(filterKey[i]));
		}
	}
	checked = checked.every(item => !item);
	return checked
}
