// Model
const model = {
  todos: [], //local storage, db
  addTodo: function (todo) {
    this.todos.push(todo);
  },
};

// View
const view = {
  todoList: document.getElementById("todo-list"),
  renderTodo: function (todo) {
    const todoItem = document.createElement("li");
    todoItem.textContent = todo;
    this.todoList.appendChild(todoItem);
  },
};

// Controller
const controller = {
  init: function () {
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const todoInput = document.getElementById("todo-input");
      const todo = todoInput.value;
      if (todo.trim() !== "") {
        model.addTodo(todo);
        view.renderTodo(todo);
        todoInput.value = "";
      }
    });
  },
};

controller.init();
