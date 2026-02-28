import Todo from './todo.js';
import Project from './project.js';

const Storage = (() => {
    const save = (projects) => {
        localStorage.setItem('projects', JSON.stringify(projects))
    };

    const load = () => {
        const data = localStorage.getItem('projects');
        if (!data) return [];

        const rawProjects = JSON.parse(data);
        return rawProjects.map(p => {
            const project = new Project(p.name);
            p.todos.forEach(t => {
                const todo = new Todo(t.title, t.description, t.dueDate, t.priority, t.project);
                todo.id = t.id;
                todo.completed = t.completed;
                project.addTodo(todo);
            });
            return project;
        });
    };

    return { save, load };
})();

export default Storage;
