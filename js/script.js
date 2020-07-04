'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('data')));
    }

    generateKey() {
        return Math.random().toString(16).substring(2);
    }

    addToStorage() {
        localStorage.setItem('data', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';

        this.todoData.forEach(this.createItem, this);

        this.addToStorage();
    }

    createItem(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (item.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(event) {
        event.preventDefault();

        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };

            this.todoData.set(newTodo.key, newTodo);

            this.render();

            this.input.value = '';
        } else {
            alert('Нельзя добавить пустое поле!!!');
        }
    }

    deleteItem(textContent) {
        for (const key of this.todoData) {
            if (textContent === key[1]['value']) {
                this.todoData.delete(key[0]);

                this.render();
            }
        }
    }

    completedItem(textContent) {
        for (const key of this.todoData) {
            if (textContent === key[1]['value']) {
                key[1]['completed'] = !key[1]['completed'];

                this.render();
            }
        }
    }

    handler() {
        const container = document.querySelector('.todo-container');

        container.addEventListener('click', event => {
            const target = event.target;
            const textContent = target.closest('li').textContent.trim();

            if (target.matches('.todo-complete')) {
                this.completedItem(textContent);
            }

            if (target.matches('.todo-remove')) {
                this.deleteItem(textContent);
            }
        });
    }



    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));

        this.render();
        this.handler();
    }
}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
