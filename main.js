let add = document.getElementById("add");
let addText = document.querySelector(".add-text");
let btn1 = document.querySelector(".btn1");

let filter = document.getElementById("filter");
let filterText = document.querySelector(".add-filter");
let btn2 = document.querySelector(".btn2");

let tasks = document.querySelector(".tasks");

let check = document.querySelector(".check");

add.onfocus = function () {
  // addText.className += " up";         // another way to add class name
  addText.classList.add("up")
}
add.onblur = function () {
  if (add.value === "") {
    // addText.className = "add-text";   // another way to remove class name
    addText.classList.remove("up");
  }
}

let tasksArray = [];

if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

function addTaskToDiv() {
  let div = document.createElement("div");
  div.classList.add("task")

  let btnx = document.createElement("button");
  btnx.innerHTML = "x"
  btnx.classList.add("btnx")
  div.appendChild(btnx)

  if (add.value.replaceAll(" ", "")) {
    div.append(add.value);
    tasks.appendChild(div);

    addTaskToArray(add.value);
    add.value = "";
  } else {
    alert("put a text to add and don't start with space");
  }
};

function load() {
  location.reload();
};

function addTaskToArray(taskTaxt) {
  const task = {
    id: Date.now(),
    title: taskTaxt,
    completed: false,
  };
  tasksArray.push(task);

  addTasksFromLocalStorage(tasksArray)

  addDataToLocalStorage(tasksArray)
};

function addDataToLocalStorage(tasksArray) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function addTasksFromLocalStorage(tasksArray) {
  tasks.innerHTML = "";

  tasksArray.forEach((task) => {
    let div = document.createElement("div");
    div.classList.add("task");

    if (task.completed) {
      div.classList.add("done");
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    let p = document.createElement("span");
    div.appendChild(p)
    let time = new Date(task.id)
    p.appendChild(document.createTextNode(`${time.toLocaleDateString()} ${time.toLocaleTimeString()}`));

    let btnx = document.createElement("button");
    btnx.innerHTML = "x"
    btnx.classList.add("btnx")
    div.appendChild(btnx)

    tasks.appendChild(div)
  });
};

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data)
    addTasksFromLocalStorage(tasks)
  }
};

add.onkeyup = function (event) {       //enter key
  if (event.keyCode === 13) {
    btn1.click();
  }
};

btn1.addEventListener("click", addTaskToDiv);

// ==============================================
tasks.addEventListener("click", (e) => {
  // delete
  if (e.target.classList.contains("btnx")) {
    deleteTaskFromLocalStordege(e.target.parentElement.getAttribute("data-id"))

    e.target.parentElement.remove()
  };

  // task done
  if (e.target.classList.contains("task")) {
    doneTaskInLocalStorage(e.target.getAttribute("data-id"));

    e.target.classList.toggle("done");
  }
});

function deleteTaskFromLocalStordege(taskId) {
  tasksArray = tasksArray.filter((task) => task.id != taskId);
  addDataToLocalStorage(tasksArray);
}

function doneTaskInLocalStorage(taskId) {
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id == taskId) {
      tasksArray[i].completed == false ? (tasksArray[i].completed = true) : (tasksArray[i].completed = false)
    }
  }
  addDataToLocalStorage(tasksArray);
}

btn2.onclick = function () {
  if (confirm("Are you sure you want clear all tasks?!")) {
    tasks.innerHTML = "";

    tasksArray = [];
    addDataToLocalStorage(tasksArray);
  }
}

filter.onfocus = function () {
  filterText.classList.add("up")
}

filter.onblur = function () {
  if (filter.value === "") {
    filterText.classList.remove("up")
  }
}

filter.onkeyup = function (filtered) {

  let allTask = document.querySelectorAll(".task");

  allTask.forEach(function (task) {
    let item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(filtered.target.value.toLowerCase()) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
};

function functionCheck() {
  if (check.checked) {
    document.body.classList.add("moon")

    window.localStorage.setItem("check", true)
  } else {
    document.body.classList.remove("moon")

    window.localStorage.setItem("check", false)
  }
}

function checkFromLocalStorage() {
  let test = JSON.parse(localStorage.getItem("check"))
  if (test == true) {
    check.setAttribute("checked", "checked")
  } else {
    check.removeAttribute("checked")
  }
  functionCheck();
}
checkFromLocalStorage();
check.addEventListener("click", functionCheck)