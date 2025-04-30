document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTask = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

   tasks.forEach(task => renderTask(task));

  addTask.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = ""; //this clears the input
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("list-id", task.id);
    if (task.completed) li.classList.add("completed")
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return
      task.completed = !task.completed;
      li.classList.toggle("completed")
      saveTask();
    })

    li.querySelector("button").addEventListener('click', (e) => {
      e.stopPropagation(); //Prevents toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id)
      li.remove();
      saveTask();
    })

    todoList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
