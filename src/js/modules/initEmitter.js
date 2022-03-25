import EventEmitter from "../services/eventEmitter";
import { createTodo } from '../services/utils';

'use strict';

const emitter = new EventEmitter();

emitter.on('addTodo', (inputValue, todosArr) => {
    const newTodo = createTodo(inputValue);
    todosArr.push(newTodo);
});

emitter.on('findTodoId', (e) => {
    const target = e.target;
    const todo = target.parentElement;
    return +todo.getAttribute('data-id');
});

emitter.on('deleteTodo', (id, todosArr) => {
    todosArr = todosArr.filter((item) => item.id !== id);
});
emitter.on('checkTodo', (id, todosArr) => {
    return todosArr.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
});

emitter.on('checkAllTodos', (todosArr) => {
    return todosArr.map((item) => {
        return {...item, completed: true}
    });
});

emitter.on('uncheckAllTodos', (todosArr) => {
    return todosArr.map((item) => {
        return {...item, completed: false}
    });
});

emitter.on('clearCompleted', (todosArr) => {
    todosArr = todosArr.filter((item) => !item.completed);
});