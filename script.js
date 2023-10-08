const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function AddTask() {
    if (inputBox.value === '') {
        alert("Please enter a task");
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        addEditButton(li);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        showEditModal(e.target.parentElement);
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    const listItems = document.querySelectorAll('li');
    listItems.forEach(li => addEditButton(li))
}
showTask();

function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll('li.checked');
    completedTasks.forEach(task => task.remove());
    saveData();
}

function clearAllTasks() {
    listContainer.innerHTML = '';
    saveData();
}

function addEditButton(li) {
    const editButton = document.createElement('span');
    editButton.innerHTML = 'Edit';
    editButton.classList.add('edit-btn');
    li.appendChild(editButton);

    const deleteButton = document.createElement('span');
    deleteButton.innerHTML = '\u00d7';
    deleteButton.classList.add('delete-btn');
    li.appendChild(deleteButton);
}

function showEditModal(li) {
    const text = li.firstChild.textContent.trim();
    const editedText = prompt('Edit Task:', text);
    if (editedText !== null) {
        li.firstChild.textContent = editedText;
        saveData();
    }
}
