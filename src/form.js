import Todo from './todo.js';
import Dom from './dom.js';
import Storage from './storage.js';
import Project from './project.js';

const Form = (() => {
    const taskDialog = document.querySelector('#newTask');
    const taskForm = document.querySelector('#taskForm');
    const closeBtn = document.querySelector('#task-closeBtn');

    const projectDialog = document.querySelector('#addProject');    
    const openProjectForm = () => projectDialog.showModal();

    const openTaskForm = () => taskDialog.showModal();
    const closeTaskForm = () => {
        taskDialog.close();
        delete taskForm.dataset.editing;
        taskForm.reset();
    }

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        const { taskTitle, description, dueDate } = taskForm;
        const priority = document.querySelector('#priority-level').value;
        const projectName = document.querySelector('#toProject').value;
        const projects = Dom.getProjects();
        const project = projects.find(p => p.name === projectName);

        const editing = taskForm.dataset.editing;
        if (editing) {
        const [id, projName] = editing.split('|');
        const proj = projects.find(p => p.name === projName);
        const todo = proj.getTodoById(id);
        todo.update({ title: taskTitle.value, description: description.value, dueDate: dueDate.value, priority, project: projectName });
            if (projName !== projectName) {
                proj.deleteTodo(id);
                project.addTodo(todo);
            }
        } else {
            const todo = new Todo(taskTitle.value, description.value, dueDate.value, priority, projectName);
            project.addTodo(todo);
        }

        Storage.save(projects);
        Dom.renderTodos();
        closeTaskForm();
    };

    const handleProjectAdd = () => {
        const name = document.querySelector('#addprogect').value;
        if (!name) return;       

        const projects = Dom.getProjects();
        if (projects.some(p => p.name === name)) return;

        const newProj = new Project(name);
        projects.push(newProj);
        Dom.addProjectToDOM(name);
        Storage.save(projects);
        document.querySelector('#projectForm').reset();
        document.querySelector('#addProject').close();
    };

    const setup = () => {
        document.querySelectorAll('#addTask-Btn').forEach(btn => {
            btn.addEventListener('click', openTaskForm);
        });
        closeBtn.addEventListener('click', closeTaskForm);
        taskForm.addEventListener('submit', handleTaskSubmit);
        document.querySelector('#project-submitBtn').addEventListener('click', handleProjectAdd);

        document.querySelector('#new-project').addEventListener('click', openProjectForm);
        document.querySelector('#project-closeBtn').addEventListener('click', () => projectDialog.close());
    };

    return { setup };
})();


export default Form;









// const newTask = document.getElementById("newTask")
// const closeBtn = document.getElementById("task-closeBtn")
// const addTask = document.getElementById("addTask-Btn")
// addTask.addEventListener('click', () => {
//     newTask.showModal();
// })
// closeBtn.addEventListener('click', () => {
//     newTask.close();
// })
