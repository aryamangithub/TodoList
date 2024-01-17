const form = document.getElementById('form')
const input = document.getElementById('input')
const todosOL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos.length>0) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        todoEl.completed = false

        if(todo && todo.completed) {
            todoEl.completed = true
            todoEl.classList.add('completed')
        }
        const {date, time, day} = getCurrentDateTime()
        
        todoEl.innerHTML = `
                        <span>${todoText}</span>
                        <span class="datetime">${date} ${time} (${day})</span>
        `

        todoEl.addEventListener('click', () => {
            if(todoEl.completed){
                todoEl.remove();
                updateLS();
            }
            else {
                todoEl.completed = true
                todoEl.classList.toggle('completed');
                updateLS();
            }
        }) 

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        }) 

        todosOL.insertBefore(todoEl, todoOl.firstChild)
        input.value = ''
        updateLS()
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.querySelector('span')innerText,
            completed: todoEl.completed
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

function getCurrentDateTime() {
    const now = new Date()
    const date = now.toLocaleDateString()
    const time = now.toLocaleTimeString()
    const day = getDayOfWeek(now.getDay())

    return {date, time, day}
}

function getDayOfWeek(dayIndex) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return daysOfWeek[dayIndex]
}
