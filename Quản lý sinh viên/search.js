const inputSearch = document.querySelector(".search-bar");
const formTwo = document.querySelector(".form-2");

formTwo.addEventListener("submit", stopEvent);

function stopEvent (e) {
	e.preventDefault();
	valueSearch = inputSearch.value.toLowerCase();
	const trTable = document.querySelectorAll(".add #table1 tbody tr");
	trTable.forEach(tr => {
		const nameChild = tr.querySelector("#nameTable");
		const codeChild = tr.querySelector("#codeTable");
		if(nameChild.innerText.toLowerCase().includes(valueSearch.trim()) || codeChild.innerText.toLowerCase().includes(valueSearch.trim())) {
				tr.style.display = 'table-row';
			}
		else tr.style.display = 'none';
	})
}
