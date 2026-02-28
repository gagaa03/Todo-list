class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    this.project = project || 'default';
  }

  //切換完成狀態
  toggleComplete() {    
    this.completed = !this.completed;
  }

  update(data) {
    Object.assign(this, data);
  }
}


export default Todo;
