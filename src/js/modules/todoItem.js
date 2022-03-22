export default class TodoItem {
    constructor({id, completed, text}, todoList) {
        this.id = id;
        this.completed = completed;
        this.text = text;
        this.todoList = todoList;
    }

    render() {

        const { id, completed, text, todoList } = this;

        const newTodo = document.createElement('li');
        const textWrapper = document.createElement('div');
        const textDiv = document.createElement('div');
        const textInput = document.createElement('input');

        textInput.setAttribute('type', 'text');
        textInput.setAttribute('value', text);
        textInput.classList.add('todo-text');
        textInput.classList.add('hidden');

        newTodo.setAttribute("data-id", id);
        newTodo.classList.add('todo-item');

        textDiv.classList.add('todo-text');
        textDiv.innerText = text;

        textWrapper.classList.add('text-wrapper');
        textWrapper.appendChild(textDiv);
        textWrapper.appendChild(textInput);

        newTodo.appendChild(textWrapper);
        todoList.appendChild(newTodo);

        // Check button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        completedBtn.classList.add('complete-btn');
        completedBtn.setAttribute('data-complete', 'complete');
        if (completed) {
            newTodo.classList.add('checked');
            newTodo.classList.add('completed');
        } else {
            newTodo.classList.remove('checked');
            newTodo.classList.remove('completed');
        }
        newTodo.prepend(completedBtn);

        // Trash button
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        trashBtn.classList.add('trash-btn');
        trashBtn.setAttribute('data-trash', 'trash');
        newTodo.appendChild(trashBtn);
    }
}