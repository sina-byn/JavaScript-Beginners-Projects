// my github profile link ==> https://github.com/sina-byn
// note that this type of commenting is not suggested to be used
// and comments are just for you to get a better hang
// of what each part of the code is doing
// activating js strict mode
"use strict";

// variables
const todoInp = document.querySelector('.todo-inp');
const addBtn = document.querySelector('.add-btn');
const todosContainer = document.querySelector('.todos-container');
const clearAll = document.querySelector('.clear-all-btn');
const allTodos = [];

// functions
const addTodo = () => {
    let todoText = todoInp.value;

    // check the input value to avoid empty strings
    if (todoText) {
        renderTodo(todoText);

        // reset todo-inp value after new todo submission
        todoInp.value = "";

        // add a new todo to allTodos array and save it to local-storage
        allTodos.push({
            text: todoText,
            isCompleted: false
        });
        saveTodos();
    }
}

const deleteTodo = (e) => {
    // going from the path element up in the DOM tree
    // button > btns-container > todo
    const currTodo = e.target.parentElement.parentElement;

    // removing the target tood allTodos array and save it to local-storage
    const todoIdx = getTodoIdx(currTodo);
    allTodos.splice(todoIdx, 1);
    saveTodos();

    currTodo.remove();
}

const editInit = (e) => {
    // going from the path element up in the DOM tree
    // button > btns-container > todo
    const currTodo = e.target.parentElement.parentElement;
    const todoText = currTodo.querySelector('p.todo-text');
    const editInp = currTodo.querySelector('input[type="text"]');
    const deleteBtn = currTodo.querySelector('.btns-container .delete-btn');
    const editBtn = currTodo.querySelector('.btns-container .edit-btn');
    const submitBtn = currTodo.querySelector('.btns-container .submit-btn');
    const checkbox = currTodo.querySelector('input[type="checkbox"]');

    // toggling visiblity on mode switch - can also become a function
    todoText.classList.add('hidden');
    editBtn.classList.add('hidden');
    deleteBtn.classList.add('hidden');
    checkbox.classList.add('hidden');
    editInp.classList.remove('hidden');
    submitBtn.classList.remove('hidden');
};

const editSumbit = (e) => {
    // going from the path element up in the DOM tree
    // button > btns-container > todo
    const currTodo = e.target.parentElement.parentElement;
    const todoText = currTodo.querySelector('p.todo-text');
    const editInp = currTodo.querySelector('input[type="text"]');
    const deleteBtn = currTodo.querySelector('.btns-container .delete-btn');
    const editBtn = currTodo.querySelector('.btns-container .edit-btn');
    const submitBtn = currTodo.querySelector('.btns-container .submit-btn');
    const checkbox = currTodo.querySelector('input[type="checkbox"]');
    let edittedVal = editInp.value;

    // replacing the edited value with the previous one if it's not falsy
    if (edittedVal) {
        if (edittedVal.length > 20) {
            edittedVal = edittedVal.slice(0, 15) + '...';
        }
        todoText.innerText = edittedVal;

        // toggling visibility on mode switch - can also become a function
        todoText.classList.remove('hidden');
        editBtn.classList.remove('hidden');
        deleteBtn.classList.remove('hidden');
        checkbox.classList.remove('hidden');
        editInp.classList.add('hidden');
        submitBtn.classList.add('hidden');

        // updating allTodos and saving it in the local-storage
        const todoIdx = getTodoIdx(currTodo);
        allTodos[todoIdx].text = editInp.value;
        saveTodos();
    }
}

const toggleIsCompletedState = (e) => {
    // going from checkbox to the parent todo
    const currTodo = e.target.parentElement.parentElement;

    currTodo.classList.toggle('is-completed');

    // updating allTodos and saving it in the local-storage
    const todoIdx = getTodoIdx(currTodo);
    allTodos[todoIdx].isCompleted = e.target.checked;
    saveTodos();
};

// render todos on screen
const renderTodo = (todoText, isCompleted = false) => {
    // creating new elements to add to the DOM tree using DOM createElement method
    const todo = document.createElement('div');
    const todoTextElem = document.createElement('p');
    const editInp = document.createElement('input');
    const btnsContainer = document.createElement('div');
    const deleteBtn = document.createElement('i');
    const editBtn = document.createElement('i');
    const submitBtn = document.createElement('i');
    const checkbox = document.createElement('input');

    editInp.type = "text";
    editInp.value = todoText;
    editInp.className = "edit-inp hidden";
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;
    checkbox.className = "todo-checkbox";
    checkbox.onclick = toggleIsCompletedState;

    // adding icons classes and functionalities
    deleteBtn.className = "delete-btn fa-solid fa-trash";
    editBtn.className = "edit-btn fa-solid fa-pen-to-square";
    submitBtn.classList = "submit-btn hidden fa-solid fa-check";

    deleteBtn.onclick = deleteTodo;
    editBtn.onclick = editInit;
    submitBtn.onclick = editSumbit;

    btnsContainer.className = "btns-container";

    todoTextElem.className = "todo-text";
    todoTextElem.title = "double click to copy the todo text"
    todoTextElem.ondblclick = copyText;
    if (todoText.length > 15) {
        todoTextElem.innerText = todoText.slice(0, 15) + '...';
    } else {
        todoTextElem.innerText = todoText;
    }

    todo.className = `todo shadow ${isCompleted ? "is-completed" : ""}`;

    // adding elements to parents using DOM append method
    btnsContainer.append(editBtn, deleteBtn, checkbox, submitBtn);
    todo.append(todoTextElem, editInp, btnsContainer);
    todosContainer.append(todo);
};

const clearAllTodos = () => {
    if (allTodos.length) {
        const shouldClear = prompt("Are you sure that you want to clear all your todos ??? Y/N");

        if (shouldClear) {
            if (shouldClear.toLowerCase() === 'y') {
                allTodos.splice(0);
                todosContainer.innerHTML = "";
                localStorage.setItem('todos', '[]');
            }
        }
    }
};

// get the index of the target todo in the list of all todos
const getTodoIdx = (todoElem) => {
    const allTodoElems = Array.from(todosContainer.children);

    return allTodoElems.indexOf(todoElem);
};

// copy todo text on dbclick
const copyText = (e) => {
    navigator.clipboard.writeText(e.target.nextSibling.value).then(() => {
        alert("Todo Text Copied To Clipboard");
    }).catch(err => console.error(err));
};

// local-storage handler functions
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(allTodos));
};

const getSavedTodos = () => {
    const todos = localStorage.getItem('todos');
    if (todos !== null) {
        const existingTodos = JSON.parse(todos);

        existingTodos.forEach(todo => {
            renderTodo(todo.text, todo.isCompleted);
            allTodos.push(todo);
        });
    }
};

// adding event-listeners
window.onload = getSavedTodos;
addBtn.onclick = addTodo;
clearAll.onclick = clearAllTodos;