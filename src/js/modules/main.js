import ToggleIcon from './toggleIcon';
import TodoList from './todoList';
import LocalStorage from '../services/localStorage';
import { createTodo, activeFilter } from '../services/utils';

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

    findTodoId = (e) => {
        const target = e.target;
        const todo = target.parentElement;
        return +todo.getAttribute('data-id');
    }

    addTodo = (inputValue) => {
        const newTodo = createTodo(inputValue);
        this.todosArr.push(newTodo);
    }

    deleteTodo = (id) => {
        this.todosArr = this.todosArr.filter((item) => item.id !== id);
    }

    checkTodo = (id) => {
        return this.todosArr.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
    }

    checkAllTodos = (todosArr) => {
        return todosArr.map((item) => {
            return {...item, completed: true}
        });
    }

    uncheckAllTodos = (todosArr) => {
        return todosArr.map((item) => {
            return {...item, completed: false}
        });
    }

    toggleAllTodos = () => {

        const { todosArr } = this;

        const everyUnchecked = todosArr.every((item) => !item.completed);
        const someChecked = todosArr.some((item) => item.completed);
        const everyChecked = todosArr.every((item) => item.completed);

        if (everyChecked) {
            this.todosArr = this.uncheckAllTodos(todosArr);
            return;
        }

        if (everyUnchecked || someChecked) {
            this.todosArr = this.checkAllTodos(todosArr);
            return;
        }
    }

    clearCompleted = () => {
        this.todosArr = this.todosArr.filter((item) => !item.completed);
    }

    onFiltersHandler = (e) => {
        this.filter = activeFilter(e, this.filtersList);
        this.render();
    }

    onClickHandler = (e) => {
        e.preventDefault();

        const { todoInput } = this;

        if (todoInput.value === '') {
            return;
        }

        this.addTodo(todoInput.value);
        todoInput.value = '';
        this.render();
    }

    onDeleteHandler = (e) => {
        const id = this.findTodoId(e);

        if (e.target.dataset.trash !== 'trash' &&  e.target.dataset.clear !== 'clear-all') {
            return;
        }

        this.deleteTodo(id);
        this.render();
    }

    onCheckHandler = (e) => {
        const id = this.findTodoId(e);

        if (!(e.target.dataset.complete === 'complete')) {
            return;
        }

        this.todosArr = this.checkTodo(id);
        this.render();
    }

    handleClear = (localStorage) => {
        this.clearCompleted();
        this.render();
        localStorage.clearLocalStorage('todosArr');
    }

    initHandlers = () => {
        const { todoButton, todoList, completeAllBtn, clearCompletedBtn, filtersList } = this;
        const localStorage = new LocalStorage();

        todoButton.addEventListener('click', this.onClickHandler);
        todoList.addEventListener('click', this.onDeleteHandler);
        todoList.addEventListener('click', (e) => {
            this.onCheckHandler(e);
            localStorage.setLocalStorage('todosArr', this.todosArr);
        });
        completeAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleAllTodos();
            this.render();
        });
        clearCompletedBtn.addEventListener('click', () => {
            this.handleClear(localStorage);
        });
        filtersList.addEventListener('click', (e) => {
            this.onFiltersHandler(e);
        });
        todoButton.addEventListener('click', () => {
            localStorage.setLocalStorage('todosArr', this.todosArr);
        });
        window.addEventListener('unload', () => {
            if (localStorage.getItem('todosArr') === '[]') {
                localStorage.clearLocalStorage('todosArr');
            }
        });
    }

    render = () => {

        const { todoList, completeAllBtn, filterPanel, todosArr, filter } = this;

        const toggleIcon = new ToggleIcon(todosArr, completeAllBtn, filterPanel);
        const todosList = new TodoList(todoList, todosArr, filter);
        toggleIcon.render();
        todosList.render();

    }
}