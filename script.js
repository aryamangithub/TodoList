const form = document.getElementById('form')
const input = document.getElementById('input')
const todosOl = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos')) || []

if(todos.length>0) {
    todos.forEach(todo => addTodoElement(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo() {
    let todoText = input.value
    
    if(todoText) {
        const timestamp = new Date().getTime(); // Current timestamp when the task is added
        const todo = {
            text: todoText,
            completed: false,
            timestamp: timestamp
        }
        todos.unshift(todo)// Add the new todo at the beginning of the array
        
        addTodoElement(todo) // Add the todo element to the DOM

        input.value = ''
        updateLS()
    }
}

function addTodoElement(todo) {
    const todoEl = document.createElement('li')
    todoEl.completed = todo.completed
    todoEl.innerHTML = `
                        <span>${todo.text}</span>
                        <span class="datetime">${formatDateTime(todo.timestamp)}</span>
                        `
    //Event listener for single click (task completed)
    todoEl.addEventListener('click', () => {
        toggleTodoCompletion(todo)
        updateLS()
    }) 

    //Event listener for right click (remove task)
    todoEl.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        removeTodoElement(todoEl, todo)
        updateLS()
    }) 

    todosOL.insertBefore(todoEl, todosOl.firstChild)
}

function removeTodoElement(todoEl, todo) {
    todoEl.remove()
    const todoIndex = todos.indexOf(todo)
    if(todoIndex !== -1){
        todos.splice(todoIndex, 1)
    }
}

function toggleTodoCompletion(todo) {
    todo.completed = !todo.completed
    updateTodoElement(todo)
}

function updateTodoElement(todo){
    const todoElements = document.querySelectorAll('li')
    todoElements.forEach(todoEl => {
        const todoText = todoEl.querySelector('span').innerText
        if(todoText === todo.text){
            todoEl.completed = todo.completed
            todoEl.classList.toggle('completed', todo.completed)
            updateLS()
        }
    })
}

function updateLS() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function formatDateTime(timestamp){
    const date = new Date(timestamp)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return date.toLocaleDateString(undefined, options)
}
