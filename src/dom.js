import Storage from "./storage";
import Todo from './todo.js';


const Dom = (() => {

    let projects = [];
    let currentView = 'all';
    let sortMode = 'date';


    const renderTodos = () => {
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = '';

        const allTodos = projects.flatMap(p => p.todos);
        let filtered = allTodos;

        const todayStr = new Date().toISOString().split('T')[0];

        if (currentView === 'today') {
            filtered = allTodos.filter(todo => {
                return !todo.completed && todo.dueDate === todayStr;
            });
        } else if (currentView === 'upcoming') {
            filtered = allTodos.filter(todo => {
                return !todo.completed && todo.dueDate > todayStr;
            });
        } else if (currentView === 'complete') {
            filtered = allTodos.filter(todo => todo.completed);
        } else if (currentView === 'all') {
            filtered = allTodos.filter(todo => !todo.completed);
        } else if (currentView.startsWith('project:')) {
            const pname = currentView.split(':')[1];
            filtered = allTodos.filter(todo => todo.project === pname);
        }


        if (sortMode === 'priority') {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        } else {
            filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        }

        
        filtered.forEach(todo => {
            const item = document.createElement('div');
            item.classList.add('todo-item');            
            item.innerHTML = `
                <h3>${todo.title}</h3>
                <p><span class="mdi mdi-calendar-range"></span> Due：${todo.dueDate}</p>                
                <p><span class="priority ${todo.priority.toLowerCase()}">${todo.priority}</span></p>
                <p>${todo.description}</p>
                <div class="completed">
                    <label for="completed-checkbox-${todo.id}">
                        <input type="checkbox" id="completed-checkbox-${todo.id}" class="completed-checkbox" ${todo.completed ? 'checked' : ''} />
                    </label>
                </div>
                
                <button class="edit-todo" data-id="${todo.id}" data-project="${todo.project}"><span class="mdi mdi-pencil"></span></button>
                <button class="delete-todo" data-id="${todo.id}" data-project="${todo.project}"><span class="mdi mdi-delete"></span></button>
            `;
        
            // 刪除事件
            item.querySelector(".delete-todo").addEventListener('click', () => {
                const proj = projects.find(p => p.name === todo.project);         
                proj.deleteTodo(todo.id);
                Storage.save(projects);
                renderTodos();
            });

            // 完成事件
            item.querySelector('.completed-checkbox')?.addEventListener('change', () => {
                const proj = projects.find(p => p.name === todo.project);
                proj.getTodoById(todo.id).toggleComplete();
                Storage.save(projects);

                renderTodos();
            });

            // 編輯事件
            item.querySelector(".edit-todo").addEventListener('click', () => {
                const proj = projects.find(p => p.name === todo.project);
                if (!proj) {
                    alert(`找不到 project: ${todo.project}`);
                    return;
                }

                const t = proj.getTodoById(todo.id);
                document.querySelector('#taskTitle').value = t.title;
                document.querySelector('#description').value = t.description;
                document.querySelector('#dueDate').value = t.dueDate;
                document.querySelector('#priority-level').value = t.priority;
                document.querySelector('#toProject').value = t.project;
                document.querySelector('#taskForm').dataset.editing = `${t.id}|${t.project}`;
                document.querySelector('#newTask').showModal();

            });

            todoList.appendChild(item);    
        });
    };

    // const getPriorityColor = (priority) => {
    //     switch (priority) {
    //         case 'High' : return 'red';
    //         case 'Medium' : return 'orange';
    //         case 'Low' : return 'green';
    //         default: return 'gray';
    //     }
    // };

    const updateTitle = () => {
        const title = document.querySelector('.title h1');
        if (currentView === 'all') title.textContent = 'All Tasks';
        else if (currentView === 'today') title.textContent = 'Today';
        else if (currentView === 'upcoming') title.textContent = 'Upcoming';
        else if (currentView === 'complete') title.textContent = 'Well Done';
    };

    const updateProjectIndicator = () => {
        const title = document.querySelector('.title h1');
        const pl = document.querySelector('#project-list');
        const label = pl.querySelector('.label');
        const name = pl.querySelector('.name');

        if (currentView.startsWith('project:')) {
            const pname = currentView.split(':')[1];
            title.textContent = '';
            label.textContent = 'Current Project：';  // 可以選擇不動
            name.textContent = `${pname}`;
            // pl.textContent = `Current Project： ${pname}`;
        } else {
            label.textContent = '';  // 也可以保留
            name.textContent = '';
        }
    };


    const setProjects = (data) => { projects = data};
    const setView = (view) => { 
        currentView = view;
        renderTodos(); 
        updateTitle();
        updateProjectIndicator();
    };
    const setSortMode = (mode) => { sortMode = mode; renderTodos(); };
    const getProjects = () => projects;

    const addProjectToDOM = (name) => {
        const select = document.querySelector('#toProject');
        const exists = [...select.options].some(opt => opt.value === name);
        if (!exists) {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
        }

        const container = document.querySelector('.projects');
        const existingBtn = [...container.children].find(btn => btn.textContent === name);
        if (!existingBtn) {
            const li = document.createElement('li');
            const btn = document.createElement('button');

            btn.className = 'project-item';
            btn.textContent = name;
            btn.onclick = () => setView('project:' + name);

            if (name !== 'default') {
                const delBtn = document.createElement('span');
                delBtn.textContent = ' X';
                delBtn.style.cursor = 'pointer';
                delBtn.onclick = (e) => {
                    e.stopPropagation(); // 避免觸發 setView
                    projects = projects.filter(p => p.name !== name);
                    Storage.save(projects);
                    container.removeChild(li); // 改成移除 <li> 而非 button
                    const opts = [...select.options];
                    opts.forEach(opt => { if (opt.value === name) opt.remove(); });
                    setView('all');
                };
                btn.appendChild(delBtn);
            }
            li.appendChild(btn);
            container.appendChild(li);

            // 自動切換為 active（simulate click）
            btn.click();
        }
    };



    return { renderTodos, setProjects, setView, getProjects, addProjectToDOM, setSortMode };
})();


export default Dom;