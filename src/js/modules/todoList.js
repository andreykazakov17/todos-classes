import MyEventEmitter from "../services/eventEmitter";

export default class TodoList extends MyEventEmitter {
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
    }

    deleteTodo = (id) => {

        this.todosArr = this.todosArr.filter((item) => item.id !== id);
        this.trigger('render', this.todosArr, this.currentFilter);
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

    updateInput = (e, localStorage) => {
        const target = e.target;
    
        if (target.tagName !== 'LI' && target.tagName !== 'DIV') return;
    
        const textWrapper = target.parentElement;
        const textDiv = textWrapper.firstChild;
        const textInput = textWrapper.lastChild;
        const valueLength = textInput.value.length;
        const id = +textWrapper.parentElement.dataset['id'];
    
        textDiv.classList.add('hidden');
        textInput.classList.remove('hidden');
        textInput.focus();
        textInput.setSelectionRange(valueLength, valueLength);

        
        
        textInput.onchange = () => {
    
            if (textInput.value === '') return;
    
            this.todosArr = this.todosArr.map((item) => item.id === id ? { ...item, text: textInput.value } : item);
            localStorage.setLocalStorage('todosArr', this.todosArr);
            this.trigger('render', this.todosArr, this.currentFilter);
        }
    
        textInput.onblur = () => {
            this.trigger('render', this.todosArr, this.currentFilter);
        }
    }
}