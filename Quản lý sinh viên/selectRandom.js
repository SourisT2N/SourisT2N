const students = [
		{
			name: 'Bùi Chí Thiện',
		},
		{
			name: 'Bùi Linh Chi',
		},
		{
			name: 'Trịnh Thị Ái Phi',
		},
		{
			name: 'Trần Nam Phương',
		},
		{
			name: 'Đỗ Hồng Hạnh',
		},
		{
			name: 'Nguyễn Hà My',
		},
		{
			name: 'Phạm Nguyễn Bảo Ngọc',
		},
		{
			name: 'Nguyễn Thị Mai Hương',
		},
		{
			name: 'Trần Quốc Tuấn',
		},
		{
			name: 'Trịnh Hoàng',
		},
		{
			name: 'Lý Thiện',
		},
		{
			name: 'Lý Hải',
		},
		{
			name: 'Bùi Thị Huệ',
		},
		{
			name: 'Nguyễn Chí Linh',
		},
		{
			name: 'Trần Văn Công',
		},
		{
			name: 'Lý Kiệt',
		},
		{
			name: 'Bích Thủy',
		},
		{
			name: 'Ngọc Thy',
		},
	]
const addressStudents = ['Mạc Đỉnh Chi','Ngô Gia Tự','Nguyễn Trãi','Nguyễn Huệ','Quang Trung',
	'Nguyễn Tất Thành','Ngô Sỹ Liên','Phù Đổng','Trần Nhật Duật','Lê Hồng Phong','Lê Lợi','Trần Phú',
	'Trịnh Phong','Đinh Tiên Hoàng','Đinh Bộ Lĩnh'];


const selectBtn = document.querySelector(".select-btn");
const selectOption = document.getElementById("test");

selectBtn.onclick = () => {
	const selectValue = selectOption.value;
	let id;
	for(let i = 0;i < students.length;i++){
		let numberAddress = Math.floor(Math.random()*500 + 1);
		let addressStudent = addressStudents[Math.floor(Math.random()*addressStudents.length)];
		students[i].address = `${numberAddress} ${addressStudent}`;
	}
	if(selectValue == 5) {
		const obj = randomSelectOption(selectValue);
		for(let i = 0;i < obj.length;i++){
			id = new Date().getTime() + Math.floor(Math.random()*100);
			createNewElement(obj[i],id);
			addLocalStorage(obj[i],id);
			arr.push(obj[i]);
		}
	}
	else if(selectValue == 10) {
		const obj = randomSelectOption(selectValue);
		for(let i = 0;i < obj.length;i++){
			id = new Date().getTime() + Math.floor(Math.random()*100);
			createNewElement(obj[i],id);
			addLocalStorage(obj[i],id);
			arr.push(obj[i]);
		}
	}
	else if(selectValue == 15) {
		const obj = randomSelectOption(selectValue);
		for(let i = 0;i < obj.length;i++){
			id = new Date().getTime() + Math.floor(Math.random()*100);
			createNewElement(obj[i],id);
			addLocalStorage(obj[i],id);
			arr.push(obj[i]);
		}
	}
}

function randomSelectOption (value) {
	let mid;
	let codes = '';
	let arrStudents = [];
	const studentsLength = students.length;
	for(let i = 0;true;i++){
		let j = Math.floor(Math.random()*studentsLength);
		mid = students[i];
		students[i] = students[j];
		students[j] = mid;
		if(i == studentsLength - 1){
			i = 0;
		}
		if(arrStudents.length > 0 && arrStudents.length < Number(value)){
			const checkStudents = arrStudents.some(item => item.name.includes(students[i].name)||item.address.includes(students[i].address));
			if(!checkStudents) {
				arrStudents.push(students[i]);
			}
		}
		else if(arrStudents.length == 0) {arrStudents.push(students[i]);}
		if(arrStudents.length >= Number(value)){
			break;
		}
	}
	const lengthStudents = arrStudents.length;
	let countCode = 0;
	const arrCode = [1,2,3,4,5,6,7,8,9]
	for(let i = 0;true;i++){
		for(let j = 1;j <= 8;j++){
			codes += Math.floor(Math.random()*9 + 1);
		}
		if(arrStudents[i].code == codes){
			continue;
		}
		else {
			arrStudents[i].code = codes;
			countCode++;
		}
		codes = '';
		if(countCode == lengthStudents){
			break;
		}
	}
	return arrStudents;
}
