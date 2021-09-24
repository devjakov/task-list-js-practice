//  Defining UI variables we are going to be using for the project

const form = document.querySelector('#task-form');
const submitBtn = document.querySelector('#thisBtn')
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners 
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear all tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

// Load tasks from LS
function getTasks(){
    let tasks;
    if( localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(e){
    // Copied from 'Add Task'
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(e));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link); 
    taskList.appendChild(li);
    })
}

// Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');  
    }
    // prevent button from redirecting
    e.preventDefault();
    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to the li
    li.appendChild(link);
    
    // This if statement checks to see if it should append 
    // otherwise you can spam empty li elements
    if(taskInput.value !== ''){
    taskList.appendChild(li);
    // after adding the task to the list go and add it to LS
    addToLocalStorage(taskInput.value);
    } 
}

// Add to LS
function addToLocalStorage(e){
    // Here we declare a variable which we will use as array for housing tasks in storage
    let tasks;
    if( localStorage.getItem('tasks') === null){
        // If there is nothing already in Storage, we should create empty array
        tasks = [];
    } else {
        // If there is, whatever is in there our variable should become it 
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // But whatever the case is we will push our task into the array
    tasks.push(e);

    // We then set it back into storage
    // let tasks is array so we have to turn it into string for storage
    // JS localStorage only accepts strings
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
}

// Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLS(e.target.parentElement.parentElement);
    }
    
}

// Remove from LS
function removeTaskFromLS(e){
    console.log(e);
    let tasks;
    tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(x, index){
        if(e.textContent === x){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear all tasks
function clearTasks(){
    taskList.innerHTML = '';
    localStorage.clear();
}

// Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}