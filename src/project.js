class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);

    // 等同於
    // const newTodos = todos.filter(function(todo) {
    //     return todo.id !== id;
    // });
    // todos = newTodos;
  }

  getTodoById(id) {
    return this.todos.find(todo => todo.id === id);
  }
}


export default Project;
