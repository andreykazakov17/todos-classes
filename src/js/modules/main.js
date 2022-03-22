import ToggleIcon from './toggleIcon';
import TodoList from './todoList';
import LocalStorage from '../services/localStorage';
import { createTodo, countTodos, activeFilter } from '../services/utils';

export default class Main {
    constructor({
        todoInput = null,
        todoButton = null,
        todoList = null,
        completeAllBtn = null,
        filterPanel = null,
        clearCompletedBtn = null,
        filtersList = null,
        todosArr = [],
        filter = 'all' } = {}){
        this.todoInput = document.querySelector(todoInput);
        this.todoButton = document.querySelector(todoButton);
        this.todoList = document.querySelector(todoList);
        this.completeAllBtn = document.querySelector(completeAllBtn);
        this.filterPanel = document.querySelector(filterPanel);
        this.clearCompletedBtn = document.querySelector(clearCompletedBtn);
        this.filtersList = document.querySelector(filtersList);
        this.todosArr = todosArr;
        this.filterBtns = Object.values(this.filtersList.children);
        this.filter = filter;

    }

    onFiltersHandler(e) {
        this.filter = activeFilter(e);
        this.render();
    }

    onClickHandler(e) {

        const { todoInput } = this;

        e.preventDefault();

        if (todoInput.value === '') {
            return;
        }

        addTodo(todoInput.value);
        todoInput.value = '';
        this.render();
    }

    onDeleteHandler(e) {
        const id = findTodoId(e);

        if (e.target.dataset.trash !== 'trash' &&  e.target.dataset.clear !== 'clear-all') {
            return;
        }

        deleteTodo(id);
        
        this.render();
        if(this.todosArr.length === 0) {
            clearLocalStorage('todosArr');
        }
    }

    onCheckHandler(e) {
        const id = findTodoId(e);

        if (!(e.target.dataset.complete === 'complete')) {
            return;
        }

        this.todosArr = checkTodo(id);
        this.render();
    }

    handleClear() {
        clearCompleted();
        this.render();
        clearLocalStorage('todosArr');
    }

    addTodo(inputValue) {
        const newTodo = createTodo(inputValue);
        this.todosArr.push(newTodo);
    }


    render() {

        const { todoInput, todoButton, todoList, completeAllBtn, filterPanel, clearCompletedBtn, filtersList, todosArr, filter } = this;

        console.log('Render!');
        console.log(this.todosArr);

        const toggleIcon = new ToggleIcon(todosArr, completeAllBtn, filterPanel);
        const todosList = new TodoList(todoList, todosArr, filter);
        toggleIcon.render();
        todosList.render();

    }
}

todoButton.addEventListener('click', this.onClickHandler);