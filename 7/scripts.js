const addForm = document.getElementById("add_form");
const newNameInput = document.getElementById("todo_new_name");
const todoListHtml = document.getElementById("todo__list");

let todoList = [];

/**
 * Adds task to todo list.
 * @param {string} name - Task name.
 * @param {boolean} done - Is task done already.
 * @returns {number} Task id.
 */
function addTask(name, done) {
    const id = Math.floor(Math.random() * 1000000000);
    todoList.push({
        id: id,
        name: name,
        done: done
    });
    return id;
}

/**
 * Delete task from todo list.
 * @param {number} id - Task id.
 */
function deleteTask(id) {
    todoList = todoList.filter(function (task) {
        return task.id !== id;
    });
}

/**
 * Returns html todo list element.
 * @param {number} id - Task id.
 * @param {string} name - Task name.
 * @param {boolean} done - Is task done already.
 */
 function createTodo(id, name, done) {
    const todo = document.createElement("li");
    todo.innerHTML = `<h4 class="todo__name">${name}</h3>`;
    todo.classList.add("todo__element");
    todo.id = id;

    const doneButton = document.createElement("button");
    doneButton.id = "todo_done__button";
    doneButton.classList.add("button", "todo_done__button");
    doneButton.innerText = done ? "Done" : "Revert";
    
    const deleteButton = document.createElement("button");
    deleteButton.id = "todo_delete__button";
    deleteButton.classList.add("button", "todo_delete__button");
    deleteButton.innerText = "Remove";
    deleteButton.addEventListener("click", function (e) {
        deleteTask(id);
        renderList();
    })

    todo.append(doneButton, deleteButton);
    return todo;
}

/**
 * Renders html todo list.
 */
function renderList() {
    todoListHtml.innerHTML = '';
    todoList.map(function (task) {
        todoListHtml.append(createTodo(task.id, task.name, task.done));
    });
}

addForm.addEventListener("submit", function(e) {
    e.preventDefault();
    addTask(newNameInput.value, false);
    newNameInput.value = "";
    renderList();
})