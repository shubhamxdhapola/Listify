let todoList = JSON.parse(localStorage.getItem('todo')) || [];
const nameInput = document.getElementById('name');
let errorCount = 0;

nameInput.addEventListener('click', showCursorOnClick);
nameInput.addEventListener('keypress', saveNameOnEnter);
document.body.addEventListener('click', saveNameOnClickOutside);

function showCursorOnClick() { 
    nameInput.classList.remove('hide-cursor'); 
}

function saveNameOnEnter(e) {
    if (e.key === 'Enter' && nameInput.value.trim()) {
        storeUserName(); 
    }
}

function saveNameOnClickOutside(e) {
    if (e.target !== nameInput) {
        storeUserName()
    }
}

function storeUserName() {
    localStorage.setItem('username', nameInput.value.trim());
    nameInput.classList.add('hide-cursor'); 
}

function loadUserName() {
    const storedName = localStorage.getItem('username');
    if (storedName) {
        nameInput.value = storedName;
    }
}

function addTodoItem() {
    const newTodo = document.getElementById('todo-input-box').value.trim();
    
    if (newTodo) {
        const todoInfo = { todoName: newTodo };
        todoList.push(todoInfo);
        localStorage.setItem('todo', JSON.stringify(todoList));
        document.getElementById('todo-input-box').value = '';
        
    } else if (errorCount === 0) {
        displayEmptyTodoError();
        errorCount = 1;
    }
    
    displayTodo();
}

function displayEmptyTodoError() {

    const todoBox = document.getElementById('todo-input-box');
    const errorContainer = document.getElementById('get-todo');

    const errorMsgContainer = document.createElement('div');
    errorMsgContainer.className = 'error-msg';

    const errorIcon = document.createElement('i');
    errorIcon.className = 'fa-solid fa-circle-exclamation';

    const errorText = document.createElement('span');
    errorText.innerText = " Input can't be empty";

    errorMsgContainer.appendChild(errorIcon);
    errorMsgContainer.appendChild(errorText);
    errorContainer.appendChild(errorMsgContainer);

    todoBox.classList.add('error-border');

    todoBox.addEventListener('input', () => {
        if (todoBox.value.trim() !== '') {
            clearTodoError();
        }
    });
}

function clearTodoError() {

    const todoBox = document.getElementById('todo-input-box');
    const errorContainer = document.querySelector('.error-msg');

    if (errorContainer) {
        errorContainer.remove();
    }

    todoBox.classList.remove('error-border');
    errorCount = 0;
}

function displayFieldError(borderID) {
    
    const borderElement = document.getElementById(borderID);
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-msg';
    errorContainer.id = `error-${borderID}`;

    const errorIcon = document.createElement('i');
    errorIcon.className = 'fa-solid fa-circle-exclamation';

    const errorText = document.createElement('span');
    errorText.innerText = " Input can't be empty";

    errorContainer.appendChild(errorIcon);
    errorContainer.appendChild(errorText);
    borderElement.after(errorContainer);

    borderElement.classList.add('error-border');

    const ediTodos = document.getElementsByClassName('edit-todo');
    for (let editTodo of ediTodos) {
        editTodo.addEventListener('input', () => {
            if (editTodo.value.trim() !== '') {
                clearFieldError(borderID);
            }
        });
    }
}

function clearFieldError(borderID) {
    const borderElement = document.getElementById(borderID);
    const errorContainer = document.getElementById(`error-${borderID}`);

    if (errorContainer) {
        errorContainer.remove();
    }

    borderElement.classList.remove('error-border');
    errorCount = 0;
}

function displayTodo() {

    const todoListContainer = document.getElementById('todo-list-container');
    todoListContainer.innerHTML = '';

    todoList.forEach((todo, todoIndex) => {

        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.id = `todo-${todoIndex + 1}`;

        const todoContent = document.createElement('div');
        todoContent.className = 'todo-content';
        todoContent.innerHTML = `<input type="text" value="${todo.todoName}" class="edit-todo" readonly>`;

        const actions = document.createElement('div');
        actions.className = 'actions';

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
        editBtn.className = 'edit-btn';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        todoItem.appendChild(todoContent);
        todoItem.appendChild(actions);
        todoListContainer.prepend(todoItem);

        editBtn.addEventListener('click', () => editTodo(todoContent, todoIndex, editBtn));
        deleteBtn.addEventListener('click', () => deleteTodo(todoIndex));
    });

    checkEmptyTodoList();
}

function editTodo(todoContent, todoIndex, editBtn) {

    const inputField = todoContent.querySelector('input');
    const editIcon = '<i class="fa-regular fa-pen-to-square"></i>'
    const saveIcon = '<i class="fa-solid fa-floppy-disk"></i>'
    
    inputField.readOnly = !inputField.readOnly;
    editBtn.innerHTML = inputField.readOnly ? editIcon : saveIcon;

    if (!inputField.readOnly) {
        inputField.focus();
        inputField.setSelectionRange(inputField.value.length, inputField.value.length);

    } else if (inputField.value.trim() === '') {
        if (errorCount === 0) {
            displayFieldError(todoContent.parentElement.id);
            errorCount = 1;
        }
        inputField.readOnly = false;
        editBtn.innerHTML = saveIcon;
        inputField.focus();

    } else {
        todoList[todoIndex].todoName = inputField.value.trim();
        localStorage.setItem('todo', JSON.stringify(todoList));
        errorCount = 0;
    }
}

function deleteTodo(todoIndex) {
    todoList.splice(todoIndex, 1);
    localStorage.setItem('todo', JSON.stringify(todoList));
    displayTodo();

}

function checkEmptyTodoList(){
    const noTodos = document.querySelector('#todo-list-container');
    if (noTodos.childElementCount === 0) {
        noTodos.innerHTML = '<div class="empty-msg">Your todo list is empty</div>'
    }
}

document.getElementById('clear-todos-btn')
.addEventListener('click', () => {
    todoList = [];
    localStorage.removeItem('todo');
    displayTodo();
});

document.getElementById('add-todo-btn')
.addEventListener('click', (e) => {
    e.preventDefault();
    addTodoItem();
});

window.onload = () => {
    displayTodo();
    loadUserName();
};
