const createTodo = (text) => ({
    text,
    completed: false,
    id: new Date().getTime()
});

const countTodos = (todosArr) => {
    return todosArr.length;
}

const activeFilter = (e, filtersList) => {
    if (e.target.tagName !== 'BUTTON') return;

    for(let btn of Object.values(filtersList.children)) {
        btn.classList.remove('active-btn');
    }
    e.target.classList.add('active-btn');
    return e.target.dataset['btn'];
}

export { createTodo, countTodos, activeFilter };