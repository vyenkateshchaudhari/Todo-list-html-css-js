const addTodoBtn = document.getElementById("addTodoBtn");
const inputTag = document.getElementById("todoInput");
const todoListUl = document.getElementById("todoList");
const remaining = document.getElementById("remaining-count")
const clearCompletedBtn = document.getElementById("clearCompletedBtn")
const allBtn = document.getElementById("allBtn")
const activeBtn = document.getElementById("active")
const CompletedBtn = document.getElementById("CompletedBtn")

let todoText;

let todos = [];
let todosString = localStorage.getItem("todos");
if (todosString) {
    todos = JSON.parse(todosString);
    remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
}

const populateTodos = () => {
    let string = "";
    for (const todo of todos) {
        string += `<li id="${todo.id}" class="todo-item  ${todo.isCompleted ? "completed" : ""}" >
                     <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                     <span class="todo-text">${todo.title}</span>
                     <button class="delete-btn">×</button>
                </li>`
    }
    todoListUl.innerHTML = string

    const todoCheckboxes = document.querySelectorAll(".todo-checkbox");

    todoCheckboxes.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentNode.classList.add("completed")
                todos = todos.map(todo => {
                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: true }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
            else {
                element.parentNode.classList.remove("completed")
                todos = todos.map(todo => {
                    if (todo.id == element.parentNode.id) {
                        return { ...todo, isCompleted: false }
                    }
                    else {
                        return todo
                    }
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
            }
        })
    });

    //Handle the clear completed button
    clearCompletedBtn.addEventListener("click", () => {
        todos = todos.filter((todo) => todo.isCompleted == false)
        populateTodos()
        localStorage.setItem("todos", JSON.stringify(todos))
    })

    allBtn.addEventListener("click", ()=>{
        populateTodos()
    })

    //active button function
    activeBtn.addEventListener("click", () => {
        const activeTodos = todos.filter(todo => !todo.isCompleted);

        let string = "";

        activeTodos.forEach(todo => {
            string += `<li id="${todo.id}" class="todo-item">
                     <input type="checkbox" class="todo-checkbox">
                     <span class="todo-text">${todo.title}</span>
                     <button class="delete-btn">×</button>
                </li>`;
        });

        todoListUl.innerHTML = string;
    });

    //complete button function
    CompletedBtn.addEventListener("click", () => {
        const completedTodos = todos.filter(todo => todo.isCompleted);

        let string = "";

        completedTodos.forEach(todo => {
            string += `<li id="${todo.id}" class="todo-item  ${todo.isCompleted ? "completed" : ""}" >
                     <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""}>
                     <span class="todo-text">${todo.title}</span>
                     <button class="delete-btn">×</button>
                </li>`
        });

        todoListUl.innerHTML = string;
    });


    // Handle the delete buttonsx
    let deleteBtns = document.querySelectorAll(".delete-btn")

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {
            const confirmation = confirm("Do you want to delete this todo")
            if (confirmation) {
                console.log(e.target.parentNode)
                todos = todos.filter((todo) => {
                    return (todo.id) !== (e.target.parentNode.id)
                })
                remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
                localStorage.setItem("todos", JSON.stringify(todos))
                populateTodos()
            }

        })
    })

}

addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value;

    if (todoText.trim().length < 4) {
        alert("You cannot add a todo that small!")
        return
    }

    inputTag.value = "";
    let todo = {
        id: "todo-" + Date.now(),
        title: todoText,
        isCompleted: false
    }
    todos.push(todo)
    remaining.innerHTML = todos.filter((item) => { return item.isCompleted != true }).length;
    localStorage.setItem("todos", JSON.stringify(todos))
    populateTodos();
});

populateTodos();


