// const taskMenu = document.querySelectorAll('.task-buttons li button');
// taskMenu.forEach(button => {
// 	const li = button.parentElement;

//     // 排除 .no-active 列
// 	if (li.classList.contains('no-active')) return;

// 	button.addEventListener('click', () => {
// 		// 移除所有 li 的 active
// 		document.querySelectorAll('.task-buttons li').forEach(li => {
// 			// 不移除 no-active 行的 active 狀態（即便有誤加）
// 			if (!li.classList.contains('no-active')) {
// 				li.classList.remove('active');
// 			}
// 		});
// 		// 將目前點擊的 li 加上 active
// 		li.classList.add('active');
// 	});
// });


document.addEventListener('click', (e) => {
	// 僅處理來自 .task-buttons 或 .projects 中的 <button>
	const isValidBtn =
		e.target.tagName === 'BUTTON' &&
		(e.target.closest('.task-buttons') || e.target.closest('.projects'));

	if (!isValidBtn) return;

	const li = e.target.closest('li');
	if (!li || li.classList.contains('no-active')) return;

	// 移除所有 active（不管在哪一區）
	document.querySelectorAll('.task-buttons li.active, .projects li.active').forEach(activeLi => {
		if (!activeLi.classList.contains('no-active')) {
			activeLi.classList.remove('active');
		}
	});

	// 加上當前點擊的 active
	li.classList.add('active');
});


document.addEventListener("DOMContentLoaded", () => {
	const todoList = document.getElementById("todo-list");
	if (!todoList) {
		console.warn("找不到 #todo-list");
		return;
	}

	todoList.addEventListener("change", (e) => {
		const checkbox = e.target;
		if (checkbox.classList.contains("completed-checkbox")) {
			const todoItem = checkbox.closest(".todo-item");
			if (todoItem) {
				console.log("Checkbox changed:", checkbox.checked); // ✅ 加這行
				todoItem.style.opacity = checkbox.checked ? "0.5" : "1";
			}
		}
	});
});


