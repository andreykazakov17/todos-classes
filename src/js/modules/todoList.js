import TodoItem from "./todoItem";

export default class TodoList {
    constructor(todoList, todosArr, filter) {
        this.todoList = todoList;
        this.todosArr = todosArr;
        this.filter = filter;
    }

    filterTodos(items) {
        switch (this.filter) {
            case "active":
                return items.filter((item) => !item.completed);
            case "completed":
                return items.filter((item) => item.completed);
            default:
                return items;
        }
    }
    

    render() {

        const { todoList, todosArr, filter } = this;

        todoList.innerHTML = '';
        this.filterTodos(todosArr, filter).forEach((item) => {
            const todoItem = new TodoItem(item, todoList);
            todoItem.render();
        });
    }
}