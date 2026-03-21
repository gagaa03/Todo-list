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



// 側邊攔
const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
const sideBar = document.querySelector('.side');

// 建立遮罩層
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// 開啟選單
mobileMenuBtn.addEventListener('click', () => {
    sideBar.classList.add('active');
    overlay.classList.add('active');
});

// 點擊遮罩關閉選單
overlay.addEventListener('click', () => {
    sideBar.classList.remove('active');
    overlay.classList.remove('active');
});

// 點擊側邊欄內的項目後自動關閉
const sideButtons = document.querySelectorAll('.side button');
sideButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            sideBar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});




// 搜尋框
const mainHeader = document.querySelector('.header'); 
const mainSearchInput = document.querySelector('.search-form input');


if (mainSearchInput) {
    // 當使用者點擊搜尋框
    mainSearchInput.addEventListener('focus', () => {
        if (window.innerWidth <= 768) {
            mainHeader.classList.add('search-active');
        }
    });

    // 當使用者點擊其他位置
    mainSearchInput.addEventListener('blur', () => {
        if (window.innerWidth <= 768) {
            mainHeader.classList.remove('search-active');
        }
    });
};


window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('.container');

   if (preloader && mainContent) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.add('animation-start');
        }, 300);
    }
});

