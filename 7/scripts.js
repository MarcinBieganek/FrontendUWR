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
 * Get task status.
 * @param {number} id - Task id.
 * @returns {boolean} Task status;
 */
function getTaskStatus(id) {
    let todoIndex = todoList.findIndex(function (task) {
        return task.id === id;
    });
    if (todoIndex === -1) return;
    return todoList[todoIndex].done;
}

/**
 * Edit task status.
 * @param {number} id - Task id.
 * @param {boolean} status - Task new staus.
 */
function editTaskStatus(id, status) {
    let todoIndex = todoList.findIndex(function (task) {
        return task.id === id;
    });
    if (todoIndex === -1) return;
    todoList[todoIndex].done = status;
}


/**
 * Returns html todo list element.
 * @param {number} id - Task id.
 * @param {string} name - Task name.
 * @param {boolean} done - Is task done already.
 */
 function createTodo(id, name, done) {
    function doneButtonText(done) {
        return done ? "Revert" : "Done";
    }

    const todo = document.createElement("li");
    todo.innerHTML = `<h4 class="todo__name">${name}</h3>`;
    todo.classList.add("todo__element");
    if (done) todo.classList.add("todo__element-done");
    todo.id = id;

    const doneButton = document.createElement("button");
    doneButton.id = "todo_done__button";
    doneButton.classList.add("button", "todo_done__button");
    doneButton.innerText = doneButtonText(done);
    doneButton.addEventListener("click", function (e) {
        const newStatus = !getTaskStatus(id);
        editTaskStatus(id, newStatus);
        doneButton.innerText = doneButtonText(newStatus);
        if (newStatus) todo.classList.add("todo__element-done");
        else todo.classList.remove("todo__element-done");
    })
    
    const deleteButton = document.createElement("button");
    deleteButton.id = "todo_delete__button";
    deleteButton.classList.add("button", "todo_delete__button");
    deleteButton.innerText = "Remove";
    deleteButton.addEventListener("click", function (e) {
        deleteTask(id);
        todo.remove();
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