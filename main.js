'use strict';

const toDoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    toDoList = document.querySelector('.todo-list'),
    toDoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

// localStorage.data = JSON.stringify(toDoData);
// toDoData = JSON.parse(localStorage.data);
// console.log(JSON.parse(localStorage.data))

function render() {

    // localStorage.data = JSON.stringify(toDoData);
    toDoData = JSON.parse(localStorage.data);
    
    toDoList.textContent = '';
    toDoCompleted.textContent = '';

    toDoData.forEach(function(item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>`;
        
        if (item.completed) {
            toDoCompleted.append(li);
        } else {
            toDoList.append(li);
        }       

        const toDoComplete = li.querySelector('.todo-complete');

        toDoComplete.addEventListener('click', function() {
            item.completed = !item.completed;

            localStorage.data = JSON.stringify(toDoData);
            toDoData = JSON.parse(localStorage.data);

            render();
        });

        const toDoRemove = li.querySelector('.todo-remove');

        toDoRemove.addEventListener('click', function() {
            toDoData.splice(i, 1);

            localStorage.data = JSON.stringify(toDoData);
            toDoData = JSON.parse(localStorage.data);

            render();
        });
    });

    localStorage.data = JSON.stringify(toDoData);
};

toDoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    let newToDo = {
        completed: false
    }

    if (headerInput.value.trim() !== '') {
        newToDo.value =  headerInput.value;

        toDoData.push(newToDo);

        headerInput.value = '';
    }

    localStorage.data = JSON.stringify(toDoData);
    toDoData = JSON.parse(localStorage.data);

    render();
});

render();