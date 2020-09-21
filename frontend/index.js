import APIHandler from "./api.js";
const API = new APIHandler();

class Todo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }
}

const getList = async () => {
  let obj = await API.getList();
  for (let i = 0; i < obj.length; i++) {
    let todoObj = new Todo(obj[i].id, obj[i].content);
    localCreate(todoObj);
  }
};

const createTodo = async () => {
  let inputTodo = document.querySelector(".inputTodo").value;
  const obj = new Todo(null, inputTodo);

  let contentId = await API.postTodo(obj);
  obj.id = contentId;
  localCreate(obj);
  document.querySelector(".inputTodo").value = "";
};

const updateTodo = (event) => {
  const id = event.target.getAttribute("dbid");
  let inputBox = document.querySelector(`#input${id}`);
  let deleteBtn = document.querySelector(`#delete${id}`);
  let updateBtn = document.querySelector(`#update${id}`);
  deleteBtn.style.display = "none";
  inputBox.readOnly = false;
  inputBox.focus();
  updateBtn.onclick = putTodo;
};

const putTodo = async (event) => {
  const id = event.target.getAttribute("dbid");
  let content = document.querySelector(`#input${id}`);
  let obj = {
    id: id,
    content: content.value,
  };
  await API.putTodo(obj);
  let deleteBtn = document.querySelector(`#delete${id}`);
  let updateBtn = document.querySelector(`#update${id}`);
  deleteBtn.style.display = "inline-block";
  updateBtn.onclick = updateTodo;
  content.readOnly = true;
};

const deleteTodo = async (event) => {
  const id = event.target.getAttribute("dbid");
  await API.deleteTodo(id);
  event.target.parentNode.parentNode.remove();
};

const clearTodo = async () => {
  let item = document.querySelector(`.section`);
  let obj = await API.getList();
  for (let i = 0; i < obj.length; i++) {
    await API.deleteTodo(obj[i].id);
    let node = document.querySelector(`#delete${obj[i].id}`);
    if (node) {
      node.parentNode.parentNode.remove();
    }
  }
};

const localCreate = (obj) => {
  let section = document.querySelector(".section");
  let newI = document.createElement("li");
  newI.id = obj.id;
  newI.className = "shadow";
  let contentBox = document.createElement("input");
  contentBox.type = "text";
  contentBox.className = "checkBtn shadow";
  contentBox.id = "input" + obj.id;
  contentBox.setAttribute("aria-hidden", "true");
  contentBox.value = obj.content;
  contentBox.readOnly = true;
  newI.appendChild(contentBox);

  let updateSpan = document.createElement("span");
  updateSpan.className = "updateBtn";
  updateSpan.type = "button";
  let updateI = document.createElement("i");
  updateI.className = "far fa-edit " + obj.id;
  updateI.id = "update" + obj.id;
  updateI.setAttribute("aria-hidden", "true");
  updateI.setAttribute("dbid", obj.id);
  updateI.onclick = updateTodo;
  updateSpan.appendChild(updateI);
  newI.appendChild(updateSpan);

  let deleteSpan = document.createElement("span");
  deleteSpan.className = "removeBtn";
  deleteSpan.type = "button";
  let deleteI = document.createElement("i");
  deleteI.className = "far fa-trash-alt " + obj.id;
  deleteI.id = "delete" + obj.id;
  deleteI.setAttribute("aria-hidden", "true");
  deleteI.setAttribute("dbid", obj.id);
  deleteI.onclick = deleteTodo;
  deleteSpan.appendChild(deleteI);
  newI.appendChild(deleteSpan);

  section.appendChild(newI);
};

(() => {
  window.createTodo = createTodo;
  window.updateTodo = updateTodo;
  window.clearTodo = clearTodo;
  getList();
})();
