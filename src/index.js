import './style.css';
import './style.js';
import Dom from './dom.js';
import Form from './form.js';
import Storage from './storage.js';
import Project from './project.js';


import { mdiMagnify } from '@mdi/js';

const searchPath = document.querySelector('#search-icon-path');
if (searchPath) {
    searchPath.setAttribute('d', mdiMagnify);
}



// 檢查使用者上次的選擇
const themeSwitch = document.querySelector('#switch-mode');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeSwitch.checked = true;
}

// 監聽深色模式切換開關
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});

// 切換類別
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

    const searchForm = document.querySelector('.header form');
    const searchInput = searchForm.querySelector('input[type="search"]')

    searchInput.addEventListener('input', (e) => {
        Dom.setSearchQuery(e.target.value)
    })

};

document.addEventListener("DOMContentLoaded", () => {
  setupApp(); // 確保 DOM 都有載入
});








