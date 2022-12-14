const newTaskInput = document.querySelector(".new-task");
const addNewTaskButton = document.querySelector(".add-new-task");
const todoList = document.querySelector(".todo-list");
let todoLocalStorage = [];

(() => {
  if (!localStorage) {
    todoLocalStorage = [];
  } else if (localStorage.getItem("item")) {
    getDataFromLocalStorage();
  }
})();

addNewTaskButton.addEventListener("click", () => {
  if (!newTaskInput.value) {
    return;
  }
  if (localStorage.getItem("item")) {
    parsedLocalStorage = JSON.parse(localStorage.getItem("item"));
    parsedLocalStorage.push(newTaskInput.value);
    localStorage.setItem("item", JSON.stringify(parsedLocalStorage));
    createTask();
  } else {
    createTask();
    // localStorage
    todoLocalStorage.push(new_task.value);
    localStorage.setItem("item", JSON.stringify(todoLocalStorage));
    console.log(localStorage);
  }
  newTaskInput.value = "";
  newTaskInput.focus();
});
console.log(localStorage);
// console.log(localStorage.clear());

function createTask() {
  div = document.createElement("div");
  div.classList.add("todo");
  divContent = document.createElement("div");
  divContent.classList.add("todo-content");
  new_task = document.createElement("input");
  new_task.classList.add("todo-text");
  new_task.value = newTaskInput.value;
  new_task.setAttribute("readonly", "readonly");

  let editBtn = document.createElement("button");
  editBtn.classList.add("edit-button");
  editBtn.textContent = "EDIT";
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-button");
  deleteBtn.textContent = "X";
  divContent.append(new_task);
  divContent.append(editBtn);
  divContent.append(deleteBtn);
  div.append(divContent);
  todoList.append(div);

  // REMOVE TASK
  deleteBtn.addEventListener("click", () => {
    let parsedLocalStorage = JSON.parse(localStorage.getItem("item"));
    let index = parsedLocalStorage.indexOf(new_task.value);
    parsedLocalStorage.splice(index, 1);
    localStorage.setItem("item", JSON.stringify(parsedLocalStorage));
    console.log(parsedLocalStorage);
    div.classList.add("remove-todo");
    setTimeout(() => {
      div.remove();
    }, 200);
  });

  // EDIT TASK
  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "EDIT") {
      editBtn.textContent = "SAVE";
      new_task.removeAttribute("readonly");
      new_task.focus();
    } else if (editBtn.textContent === "SAVE") {
      editBtn.textContent = "EDIT";
      new_task.setAttribute("readonly", "readonly");
      let index = parsedLocalStorage.indexOf(new_task.value);
      parsedLocalStorage.splice(index, 1, new_task.value);
      console.log(index);
    }
    localStorage.setItem("item", JSON.stringify(parsedLocalStorage));
  });
}

function getDataFromLocalStorage() {
  let parsedLocalStorage = JSON.parse(localStorage.getItem("item"));
  parsedLocalStorage.forEach((item) => {
    let div = document.createElement("div");
    div.classList.add("todo");
    let divContent = document.createElement("div");
    divContent.classList.add("todo-content");
    let new_task = document.createElement("input");
    new_task.value = item;
    new_task.classList.add("todo-text");
    new_task.setAttribute("readonly", "readonly");
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-button");
    editBtn.textContent = "EDIT";
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "X";
    divContent.append(new_task);
    divContent.append(editBtn);
    divContent.append(deleteBtn);
    div.append(divContent);
    todoList.append(div);

    // REMOVE TASK
    deleteBtn.addEventListener("click", () => {
      let index = parsedLocalStorage.indexOf(item);
      parsedLocalStorage.splice(index, 1);
      localStorage.setItem("item", JSON.stringify(parsedLocalStorage));
      console.log(parsedLocalStorage);
      div.classList.add("remove-todo");
      setTimeout(() => {
        div.remove(item);
      }, 200);
    });

    // EDIT TASK
    editBtn.addEventListener("click", () => {
      if (editBtn.textContent === "EDIT") {
        editBtn.textContent = "SAVE";
        new_task.removeAttribute("readonly");
        new_task.focus();
      } else if (editBtn.textContent === "SAVE") {
        new_task.setAttribute("readonly", "readonly");
        editBtn.textContent = "EDIT";

        let index = parsedLocalStorage.indexOf(item);
        parsedLocalStorage.splice(index, 1, new_task.value);
        console.log(item);
      }
      localStorage.setItem("item", JSON.stringify(parsedLocalStorage));
    });
  });
}
