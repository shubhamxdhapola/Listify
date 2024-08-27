let todoList = JSON.parse(localStorage.getItem('todo')) || [];
const nameInput = document.getElementById('name');

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
        
    } else { 
        handleInputError("Please enter a task!"); 
    }
       
    displayTodo();
}
    
function displayTodo() {

    const todoListContainer = document.getElementById('todo-list-container');
    todoListContainer.innerHTML = '';

    todoList.forEach((todo, todoIndex) => {

        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';

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

function editTodo (todoContent, todoIndex, editBtn) {

    const inputField = todoContent.querySelector('input');
    const editIcon = '<i class="fa-regular fa-pen-to-square"></i>'
    const saveIcon = '<i class="fa-solid fa-floppy-disk"></i>'
    
    inputField.readOnly = !inputField.readOnly;
    editBtn.innerHTML = inputField.readOnly ? editIcon : saveIcon;

    if (!inputField.readOnly) {
        inputField.focus();
        inputField.setSelectionRange(inputField.value.length, inputField.value.length);

    } else if (inputField.value.trim() === '') {
        handleInputError("Please enter a task!"); 
        inputField.readOnly = false;
        editBtn.innerHTML = saveIcon;
        inputField.focus();

    } else {
        todoList[todoIndex].todoName = inputField.value.trim();
        localStorage.setItem('todo', JSON.stringify(todoList));
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

function handleInputError (message){

    let overlay = document.getElementById('overlay');
    let closeBtn = document.getElementById('close-btn');
    let msg = document.getElementById('msg');

    overlay.style.display = 'flex'
    msg.innerText = message

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none'
    })
}

function validateInputSize (userNameLength, inputLength, todoItemLength) {
    
    const userName = document.getElementById('name')
    const todoInput = document.getElementById('todo-input-box')

    userName.addEventListener('input', ()=>{
       if(userName.value.length > userNameLength){
            userName.value = userName.value.slice(0, userNameLength)
            handleInputError('Max input limit reached!')
        }
    })

    todoInput.addEventListener('input', ()=>{
        
        if(todoInput.value.length > inputLength){
            todoInput.value = todoInput.value.slice(0, inputLength)
            handleInputError('Max input limit reached!')

        }
    })

    document.addEventListener('input', (e) => {
        if (e.target && e.target.classList.contains('edit-todo')) {
            if (e.target.value.length > todoItemLength) {
                e.target.value = e.target.value.slice(0, todoItemLength);
                handleInputError('Max input limit reached!')
            }
        }
    });
}

    if (window.innerWidth <= 500){
        validateInputSize(12, 25, 25)

    } else if (window.innerWidth > 500 && 
        window.innerWidth < 800){
        validateInputSize(15, 30, 30)

    } else {
        validateInputSize(20, 57, 57)
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
