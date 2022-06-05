//Define UI Element
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#filter');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clr_btn');

//Define event listener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask)
clearBtn.addEventListener('click', clearTask)
filter.addEventListener('keyup', filterTask)
document.addEventListener('DOMContentLoaded', getTask)


//Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + ' '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'Delete';
        li.appendChild(link);

        //Local store
        storeToLocalStorage(taskInput.value)

        taskInput.value = '';
    }
    e.preventDefault();
}

//Remove task
function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are you sure?")){
            let ele = e.target.parentElement;
            ele.remove();

            removeTaskFromLS(ele);
        }
    }
}

//Clear list
function clearTask(e){
    if(confirm('Are you sure?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}

//Filter task
function filterTask(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}

//Store in local storage
function storeToLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Fetch tasks from local storage
function getTask(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '));
        taskList.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'Delete';
        li.appendChild(link);
    })
}

//Remove tasks from local storage
function removeTaskFromLS(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}