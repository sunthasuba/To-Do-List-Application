document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');

    registerBtn.addEventListener('click', register);
    loginBtn.addEventListener('click', login);
    addTaskBtn.addEventListener('click', addTask);

    async function register() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Registration successful');
        } else {
            alert(`Registration failed: ${data.message}`);
        }
    }

    async function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful');
            loadTasks();
        } else {
            alert(`Login failed: ${data.message}`);
        }
    }

    async function loadTasks() {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const tasks = await response.json();
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const taskItem = createTaskElement(task.text);
                taskItem.dataset.id = task._id;
                if (task.completed) {
                    taskItem.classList.add('completed');
                }
                taskList.appendChild(taskItem);
            });
        } else {
            alert('Failed to load tasks');
        }
    }

    async function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        const token = localStorage.getItem('token');
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: taskText })
        });

        if (response.ok) {
            const task = await response.json();
            const taskItem = createTaskElement(task.text);
            taskItem.dataset.id = task._id;
            taskList.appendChild(taskItem);
            newTaskInput.value = '';
        } else {
            alert('Failed to add task');
        }
    }

    function createTaskElement(text) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTask(taskItem, taskText));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(taskItem));

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => completeTask(taskItem));

        taskItem.appendChild(taskText);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);
        taskItem.appendChild(completeBtn);

        return taskItem;
    }

    async function editTask(taskItem, taskText) {
        const newTaskText = prompt('Edit task', taskText.textContent);
        if (!newTaskText) return;

        const token = localStorage.getItem('token');
        const response = await fetch(`/api/tasks/${taskItem.dataset.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: newTaskText })
        });

        if (response.ok) {
            taskText.textContent = newTaskText;
        } else {
            alert('Failed to edit task');
        }
    }

    async function deleteTask(taskItem) {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/tasks/${taskItem.dataset.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            taskItem.remove();
        } else {
            alert('Failed to delete task');
        }
    }

    async function completeTask(taskItem) {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/tasks/${taskItem.dataset.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ completed: !taskItem.classList.contains('completed') })
        });

        if (response.ok) {
            taskItem.classList.toggle('completed');
        } else {
            alert('Failed to mark task as completed');
        }
    }

    // Load tasks when the page loads if token is present
    if (localStorage.getItem('token')) {
        loadTasks();
    }
});
