const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(text) {
    const li = document.createElement('li');
    li.innerHTML = `${text} <button onclick="removeTask(this)">Remove</button>`;
    taskList.appendChild(li);
    saveTask(text);
}

function removeTask(button) {
    const li = button.parentElement;
    const taskText = li.firstChild.nodeValue.trim();
    li.remove();
    removeTaskFromStorage(taskText);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task));
}
