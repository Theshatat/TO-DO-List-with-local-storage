let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let Arr = [];

if (localStorage.getItem("tasks")) {
  Arr = JSON.parse(localStorage.getItem("tasks"));
}

getDatafromLocal();
// check input field and add tasks
submit.onclick = function () {
  if (input.value !== "") {
    AddTaskToArr(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});
function AddTaskToArr(taskName) {
  const Task = {
    id: Date.now(),
    title: taskName,
    completed: false,
  };
  //push Task into arr
  Arr.push(Task);
  addEleToPage(Arr);
  addDataToLocal(Arr);
}

function addEleToPage(Arr) {
  tasksDiv.innerHTML = "";
  Arr.forEach((task) => {
    //create main div
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //check if task is done
    if (task.completed) {
      div.className = "task done";
    }
    //create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    //add delete button to main div
    div.appendChild(span);
    //append div in tasks div
    tasksDiv.appendChild(div);
  });
}

function addDataToLocal(Arr) {
  localStorage.setItem("tasks", JSON.stringify(Arr));
}

function getDatafromLocal() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addEleToPage(tasks);
  }
}

function deleteTaskWith(taskId) {
  Arr = Arr.filter((e) => e.id != taskId);
  addDataToLocal(Arr);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < Arr.length; i++) {
    if (Arr[i].id == taskId) {
      Arr[i].completed == false
        ? (Arr[i].completed = true)
        : (Arr[i].completed = false);
    }
  }
  addDataToLocal(Arr);
}
