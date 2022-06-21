const tasksLists = document.querySelector('.tasks-list')
const body = document.querySelector('body')
const createTaskBlock = document.querySelector('.create-task-block');
const errorMessage = document.createElement('span');
errorMessage.className = 'error-message-block';

const tasks = [
    {
      id: "1138465078061",
      completed: false,
      text: "Посмотреть новый урок по JavaScript"
    },
    {
      id: "1138465078062",
      completed: false,
      text: "Выполнить тест после урока"
    },
    {
      id: "1138465078063",
      completed: false,
      text: "Выполнить ДЗ после урока"
    }
];

const createNewTask = (task) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.dataset.taskId = task.id;
    tasksLists.append(taskItem);

    const taskItemContainer = document.createElement('div');
    taskItemContainer.className = 'task-item__main-container';
    taskItem.append(taskItemContainer);

    const taskItemContent = document.createElement('div');
    taskItemContent.className = 'task-item__main-content';
    taskItemContainer.append(taskItemContent);

    const form = document.createElement('form');
    form.className = 'checkbox-form';
    taskItemContent.append(form);

    const input = document.createElement('input');
    input.className = 'checkbox-form__checkbox';
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', 'task-' + task.id);
    form.append(input);

    const label = document.createElement('label');
    label.htmlFor = 'task-' + task.id;
    form.append(label);

    const span = document.createElement('span');
    span.className = 'task-item__text';
    span.textContent = task.text;
    taskItemContent.append(span);

    const button = document.createElement('button');
    button.className = 'task-item__delete-button default-button delete-button';
    button.dataset.deleteTaskId = task.id;
    button.textContent = 'Удалить';
    taskItemContainer.append(button);

}


tasks.forEach(task => {
    createNewTask(task);
});

createTaskBlock.addEventListener('submit', (event) => {
    event.preventDefault();
    const { target } = event;
    const taskNameInput = target.taskName;
    const inputValue = taskNameInput.value.trim();

    console.log(inputValue)
    
    let theSameTask = false;
    tasks.forEach((task) => {
        if (inputValue === task.text) {
           return theSameTask = true;
        } 
    })

    errorMessage.remove();
    if (inputValue && !theSameTask) {
        const newTask = {
            id: String(Date.now()),
            completed: false,
            text: inputValue
        }

        tasks.push(newTask);
        createNewTask(newTask);
    } else if (!inputValue) {
        errorMessage.textContent = 'Название задачи не должно быть пустым!';
        createTaskBlock.append(errorMessage);
    } else {
        errorMessage.textContent = 'Задача с таким названием уже существует.';
        createTaskBlock.append(errorMessage);
    }

    darkTheme();    
})


const modalWindow = document.createElement('div');
modalWindow.className = 'modal-overlay modal-overlay_hidden';
document.body.append(modalWindow)

const deleteModal = document.createElement('div');
deleteModal.className = 'delete-modal';
modalWindow.append(deleteModal);

const deleteModalQuestion = document.createElement('h3');
deleteModalQuestion.className = 'delete-modal__question';
deleteModalQuestion.textContent = 'Вы действительно хотите удалить эту задачу?'
deleteModal.append(deleteModalQuestion);

const deleteModalButtons = document.createElement('div');
deleteModalButtons.className = 'delete-modal__buttons';
deleteModal.append(deleteModalButtons);

const buttonCancel = document.createElement('button');
buttonCancel.className = 'delete-modal__button delete-modal__cancel-button';
buttonCancel.textContent = 'Отмена';
buttonCancel.addEventListener('click', () => {
    modalWindow.classList.add('modal-overlay_hidden')
})
deleteModalButtons.append(buttonCancel);

const buttonConfirm = document.createElement('button');
buttonConfirm.className = 'delete-modal__button delete-modal__confirm-button';
buttonConfirm.textContent = 'Удалить';
buttonConfirm.addEventListener('click', (event) => {
    modalWindow.classList.add('modal-overlay_hidden');
    const { target } = event;
    const idOfTask = target.dataset.taskId
    const searchedIndex = tasks.findIndex((task) => task.id === idOfTask)
    tasks.splice(searchedIndex, 1)
    const deleteTask = document.querySelector(`[data-task-id="${idOfTask}"]`)
    deleteTask.remove();
})
deleteModalButtons.append(buttonConfirm);


tasksLists.addEventListener('click', (event) => {
    const { target } = event;
    const isDeleteButton = target.closest('.task-item__delete-button');
    
    if (isDeleteButton) {
        modalWindow.classList.remove('modal-overlay_hidden');
        buttonConfirm.dataset.taskId = isDeleteButton.dataset.deleteTaskId
    }
})  

function darkTheme () {
    const elementsInTaskItem = document.querySelectorAll('.task-item');
    const allButtons = document.querySelectorAll('button');
    
    if (body.className === 'darkTheme') {
            body.style.background = '#24292E';  
            elementsInTaskItem.forEach((element) => element.style = 'color: #ffffff')  
            allButtons.forEach((button) => button.style = 'border: 1px solid #ffffff')
    } else {
        body.style.background = 'initial';
        elementsInTaskItem.forEach((element) => element.style = 'color: initial')  
        allButtons.forEach((button) => button.style = 'border: none')
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') {
        return 
    }   

    body.classList.toggle('darkTheme')
    darkTheme()
});


