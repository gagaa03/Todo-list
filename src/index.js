import './style.css';
import './style.js';
import Dom from './dom.js';
import Form from './form.js';
import Storage from './storage.js';
import Project from './project.js';



const setupApp = () => {
    let projects = Storage.load();
    if (!projects.some(p => p.name === 'default')) {
        const defaultProject = new Project('default');
        projects.unshift(defaultProject);
    }

    Dom.setProjects(projects);
    projects.forEach(p => Dom.addProjectToDOM(p.name));
    Dom.setView('all');
    Form.setup();

    document.querySelector('#allTasks-Btn').addEventListener('click', () => Dom.setView('all'));
    document.querySelector('#today-Btn').addEventListener('click', () => Dom.setView('today'));
    document.querySelector('#upcoming-Btn').addEventListener('click', () => Dom.setView('upcoming'));
    document.querySelector('#complete-Btn').addEventListener('click', () => Dom.setView('complete'));

    document.querySelector('#sortMode').addEventListener('change', (e) => {
        Dom.setSortMode(e.target.value);
    });

};

document.addEventListener("DOMContentLoaded", () => {
  setupApp(); // 這樣才能保證 DOM 都有載入
});










// document.addEventListener('DOMContentLoaded', () => {
//     const projects = Storage.loadProjects();
//     if (projects.length === 0) {
//         const defaultProject = new Project('Default');
//         projects.push(defaultProject);
//     }

//     Dom.setProjects(projects);
//     Dom.renderTodos(projects[0]);

//     Form.setupForms();

//   // Filter 按鈕綁定
//     const filterButtons = [
//     ['#allTasks-Btn', 'all'],
//     ['#today-Btn', 'today'],
//     ['#upcoming-Btn', 'upcoming'],
//     ['#complete-Btn', 'complete'],
//     ];

//     filterButtons.forEach(([selector, filter]) => {
//         const btn = document.querySelector(selector);
//         if (!btn) return;

//         btn.addEventListener('click', () => {
//             const current = Dom.getCurrentProject();
//             if (current) {
//                 window.currentFilter = filter;
//                 Dom.renderTodos(current, filter);
//             }
//         });
//     });
// });