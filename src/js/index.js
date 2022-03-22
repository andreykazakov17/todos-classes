import Main from './modules/main';

const todosArr = [
    {
        "text": "1",
        "completed": false,
        "id": 1647947347955
    },
    {
        "text": "2",
        "completed": false,
        "id": 1647947348238
    },
    {
        "text": "3",
        "completed": false,
        "id": 1647947348488
    }
];

//const todosArr = [];


window.addEventListener('DOMContentLoaded', () => {
    const todos = new Main({
        todoInput: '.todo-input',
        todoButton: '.todo-button',
        todoList: '.todo-list',
        completeAllBtn: '.complete-all-btn',
        filterPanel: '.todo-filters',
        clearCompletedBtn: '.todo-clear',
        filtersList: '.todo-filters-list'
    });
    todos.render();
});