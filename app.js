// Model
const model = {
  todos: [],
  getTodos() {
    return this.todos;
  },
  add(name) {
    this.todos.push({
      id: this.getNextId(),
      name,
      completed: false
    });
  },
  getNextId() {
    if (!this.todos.length) {
      return 1;
    }
    return Math.max(...this.todos.map(item => item.id)) + 1;
  },
  remove(todo) {
    this.todos = this.todos.filter(aux => aux.id != todo.id);
  },
  toggle(todo) {
    todo.completed = !todo.completed;
  },
  setName(todo, newName) {
    todo.name = newName;
  },
  sort() {
    this.todos.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }
};

// View
const view = {
  list: document.getElementById('todo-list'),
  form: document.getElementById('todo-form'),
  input: document.getElementById('todo-input'),
  sortButton: document.getElementById('todo-sort-button'),
  registerListeners() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      controller.add(this.input.value);
    });
    this.sortButton.addEventListener('click', (event) => {
      event.preventDefault();
      controller.sort();
    });
  },
  clearInput() {
    this.input.value = '';
  },
  render(todos) {
    this.list.innerHTML = '';
    todos.forEach(todo => this.list.appendChild(this.createItem(todo)));
  },
  createItem(todo) {
    const item = document.createElement("li");
    
    item.appendChild(this.createLabel(todo));
    item.appendChild(this.createRemoveAction(todo));
    item.appendChild(this.createEditAction(todo));
    item.appendChild(this.createToggleAction(todo));

    return item;
  },
  createLabel(todo) {
    const label = document.createElement("label");
    
    label.textContent = todo.name;
    if (todo.completed) {
      label.style.textDecoration = 'line-through';
    }

    return label;
  },
  createRemoveAction(todo) {
    return this.createAction('bin.png', 'Remover', () => controller.remove(todo));
  },
  createEditAction(todo) {
    return this.createAction('edit.png', 'Editar', () => controller.edit(todo));
  },
  createToggleAction(todo) {
    let icon = 'tick.png';
    let title = 'Concluir';

    if (todo.completed) {
      icon = 'restore.png';
      title = 'Restaurar';
    }

    return this.createAction(icon, title, () => controller.toggle(todo));
  },
  createAction(src, title, callback) {
    const action = document.createElement('img');
    
    action.src = src;
    action.title = title;
    action.width = 12;
    action.height = 12;
    action.style.cursor = 'pointer';
    action.style.marginLeft = '3px';
    action.addEventListener('click', callback);
    
    return action;
  },
  promptName() {
    return prompt('Digite um novo nome para o item:');
  },
  confirmRemove(todo) {
    return confirm(`Deseja realmente remover o item "${todo.name}"?`);
  }
};

// Controller
const controller = {
  init() {
    view.registerListeners();
  },
  add(name) {
    if (name.trim() !== '') {
      model.add(name);
      view.clearInput();
      view.render(model.getTodos());
    }
  },
  remove(todo) {
    if (view.confirmRemove(todo)) {
      model.remove(todo);
      view.render(model.getTodos());
    }
  },
  edit(todo) {
    const newName = view.promptName();
    if (newName) {
      model.setName(todo, newName);
      view.render(model.getTodos());
    }
  },
  toggle(todo) {
    model.toggle(todo);
    view.render(model.getTodos());
  },
  sort() {
    model.sort();
    view.render(model.getTodos());
  }
};

controller.init();