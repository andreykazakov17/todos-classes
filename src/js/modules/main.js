import Filters from './filters';
import TodoItem from './todoItem';
import LocalStorage from '../services/localStorage';
import { activeFilter, findTodoId, filterTodos } from '../services/utils';
import MyEventEmitter from '../services/eventEmitter';
  
class TodoList extends MyEventEmitter {
    constructor(todosArr, filters, currentFilter) {
        super();
        this.todosArr = todosArr;
        this.filters = filters;
        this.currentFilter = currentFilter;
    }

    addTodo = ({ text, id }) => {

        const todo = { text, id, completed: false };
        this.todosArr.push(todo);
        this.trigger("render", this.todosArr, this.currentFilter);
        this.filters.trigger('init', this.todosArr);
    }

    deleteTodo = (id) => {

        this.todosArr = this.todosArr.filter((item) => item.id !== id);
        this.trigger('render', this.todosArr, this.currentFilter);
        this.filters.trigger('init', this.todosArr);
    }

    checkTodo = (id) => {
        return this.todosArr.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
    }

    checkAllTodos = () => {
        return this.todosArr.map((item) => {
            return {...item, completed: true}
        });
    }

    uncheckAllTodos = () => {
        return this.todosArr.map((item) => {
            return {...item, completed: false}
        });
    }

    toggleAllTodos = () => {

        const everyUnchecked = this.todosArr.every((item) => !item.completed);
        const someChecked = this.todosArr.some((item) => item.completed);
        const everyChecked = this.todosArr.every((item) => item.completed);

        if (everyChecked) {
            this.todosArr = this.uncheckAllTodos(this.todosArr);
            return;
        }

        if (everyUnchecked || someChecked) {
            this.todosArr = this.checkAllTodos(this.todosArr);
            return;
        }
    }

    clearCompleted = () => {
        this.todosArr = this.todosArr.filter((item) => !item.completed);
    }
}

class TodoListView extends MyEventEmitter {
    constructor(todoListSelector, currentFilter) {
        super();
        this.currentFilter = currentFilter;
        this.todoListSelector = todoListSelector;
    }

    render = (todosArr, currentFilter) => {
        this.todoListSelector.innerHTML = '';
        filterTodos(todosArr, currentFilter).forEach((item) => {
            const todoItem = new TodoItem(item, this.todoListSelector);
            todoItem.render();
        })
    }
}

export default class Controller extends MyEventEmitter {
    constructor({ 
        todoInput = null,
        todoButton = null,
        completeAllBtn = null,
        todoListSelector = null,
        filterPanel = null,
        clearCompletedBtn = null,
        filtersList = null,
        todosArr = [],
        currentFilter = 'all' } = {}){
        super();
        this.todosArr = todosArr;
        this.currentFilter = currentFilter;
        this.todoListSelector = document.querySelector(todoListSelector);
        
        this.todoListView = new TodoListView(this.todoListSelector);
        this.todoInput = document.querySelector(todoInput);
        this.filtersBtns = document.querySelector(filtersList);
        this.filterPanel = document.querySelector(filterPanel);
        this.todoButton = document.querySelector(todoButton);
        this.completeAllBtn = document.querySelector(completeAllBtn);
        this.clearCompletedBtn = document.querySelector(clearCompletedBtn);


        this.filters = new Filters(this.completeAllBtn, this.filterPanel);
        this.filters.on('init', (todosArr) => {
            this.filters.render(todosArr);
        });

        // TodoList init and emit events
        this.todoList = new TodoList(this.todosArr, this.filters, this.currentFilter);
        this.todoList.on("add", ({ text, id }) => {
            this.todoList.addTodo({ text, id });
        });
        this.todoList.on("render", (todosArr, currentFilter) => {
            this.todoListView.render(todosArr, currentFilter);
        });
        this.todoList.on("delete", (id) => {
            this.todoList.deleteTodo(id);
        });
        this.todoList.on('check', (id) => {
            this.todoList.todosArr = this.todoList.checkTodo(id);
        });
        this.todoList.on('toggle', () => {
            this.todoList.toggleAllTodos();
        });
        this.todoList.on('clearCompleted', () => {
            this.todoList.clearCompleted();
        })
    }

    handleAddTodo = (e) => {
        e.preventDefault();

        const { todoInput } = this;

        if (todoInput.value === '') return;

        this.todoList.trigger("add", {
            text: todoInput.value,
            id: new Date().getTime(),
        });
        todoInput.value = '';
    }

    handleDeleteTodo = (e) => {
        const id = findTodoId(e);
        console.log(id);
        
        if (e.target.dataset.trash !== 'trash' &&  e.target.dataset.clear !== 'clear-all') {
            return;
        }
        this.todoList.trigger('delete', id);
    }

    handleCheckTodo = (e) => {
        const id = findTodoId(e);

        if (!(e.target.dataset.complete === 'complete')) {
            return;
        }
        
        this.todoList.trigger('check', id);
        this.todoList.trigger('render', this.todoList.todosArr, this.todoList.currentFilter);
    }

    handleFiltersTodo = (e) => {
        this.todoList.currentFilter = activeFilter(e, this.filtersBtns);
        this.todoList.trigger('render', this.todoList.todosArr, this.todoList.currentFilter);
    }

    handleCompleteAll = (e) => {
        e.preventDefault();
        this.todoList.trigger('toggle');
        this.todoList.trigger('render', this.todoList.todosArr, this.todoList.currentFilter);
    }

    handleClear = (localStorage) => {
        this.todoList.trigger('clearCompleted');

        console.log(this.filterPanel);
        this.todoList.currentFilter = 'all';
        this.todoList.trigger('render', this.todoList.todosArr, this.todoList.currentFilter);
        localStorage.setLocalStorage('todosArr', this.todoList.todosArr);
    }

    init = () => {

        const localStorage = new LocalStorage();
        this.todoList.todosArr = localStorage.getLocalStorage('todosArr') || [];
        this.todoList.trigger('render', this.todoList.todosArr, this.currentFilter);

        this.filters.trigger('init', this.todoList.todosArr);

        this.todoButton.addEventListener("click", this.handleAddTodo);
        this.todoButton.addEventListener("click", () => {
            localStorage.setLocalStorage('todosArr', this.todoList.todosArr);
        })
        this.todoListSelector.addEventListener('click', (e) => {
            this.handleDeleteTodo(e);
            localStorage.setLocalStorage('todosArr', this.todoList.todosArr);
        });
        this.todoListSelector.addEventListener('click', (e) => {
            this.handleCheckTodo(e);
            localStorage.setLocalStorage('todosArr', this.todoList.todosArr);
        });
        this.filterPanel.addEventListener('click', this.handleFiltersTodo);
        this.completeAllBtn.addEventListener('click', this.handleCompleteAll);
        this.clearCompletedBtn.addEventListener('click', () => {
            this.handleClear(localStorage);
        });
        //this.mount();
    }
}