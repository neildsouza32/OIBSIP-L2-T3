document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const taskItem = createTaskItem(taskText);
        pendingTasksList.appendChild(taskItem);
        newTaskInput.value = '';
    }

    function createTaskItem(taskText) {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', function() {
            markTaskComplete(li);
        });
        li.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            editTask(taskSpan);
        });
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            li.remove();
        });
        li.appendChild(deleteButton);

        return li;
    }

    function markTaskComplete(taskItem) {
        taskItem.classList.add('complete');
        const taskSpan = taskItem.querySelector('span');
        const taskText = taskSpan.textContent;

        taskItem.remove();
        const completedTaskItem = createTaskItem(taskText);
        completedTaskItem.querySelector('button:first-of-type').textContent = 'Pending';
        completedTaskItem.querySelector('button:first-of-type').addEventListener('click', function() {
            markTaskPending(completedTaskItem);
        });
        completedTasksList.appendChild(completedTaskItem);
    }

    function markTaskPending(taskItem) {
        taskItem.classList.remove('complete');
        const taskSpan = taskItem.querySelector('span');
        const taskText = taskSpan.textContent;

        taskItem.remove();
        const pendingTaskItem = createTaskItem(taskText);
        pendingTasksList.appendChild(pendingTaskItem);
    }

    function editTask(taskSpan) {
        const newTaskText = prompt('Edit your task:', taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskSpan.textContent = newTaskText;
        }
    }
});
