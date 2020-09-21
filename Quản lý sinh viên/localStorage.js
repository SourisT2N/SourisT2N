let countEdit = 0;
let arr = [];
function loadLocalStorage() {
  const json = valueLocalStorage();
  const lengthJson = json.length;
  if(lengthJson > 0) {
    for(let i = 0;i < lengthJson;i++){
      arr.push(json[i]);
      createNewElement(json[i],json[i].id);
    }
    countEdit = 0;
  }
}

function addLocalStorage (obj,id) {
  obj.id = id;
  const lson = valueLocalStorage();
  lson.push(obj)
  localStorage.setItem("list",JSON.stringify(lson));
}

function removeLocalStorage (id) {
  let lson = valueLocalStorage();
  lson = lson.filter(item => {
    if(item.id != id) {
      return item;
    }
  });
  localStorage.setItem("list",JSON.stringify(lson));
}

function editLocalStorage (id,obj) {
  let lson = valueLocalStorage();
  lson = lson.map(item => {
    if(item.id == id) {
      item.name = obj.name;
      item.address = obj.address;
      item.code = obj.code;
    }
    return item;
  });
  localStorage.setItem("list",JSON.stringify(lson));
}

function valueLocalStorage () {
  return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}
