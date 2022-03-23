import Main from './modules/main';
import LocalStorage from './services/localStorage';

document.addEventListener('DOMContentLoaded', () => {

    const localStorage = new LocalStorage();

    const todos = new Main({
        todoInput: '.todo-input',
        todoButton: '.todo-button',
        todoList: '.todo-list',
        completeAllBtn: '.complete-all-btn',
        filterPanel: '.todo-filters',
        clearCompletedBtn: '.todo-clear',
        filtersList: '.todo-filters-list'
    });


    todos.todosArr = localStorage.getLocalStorage('todosArr') || [];
    todos.render();
    todos.initHandlers();
});