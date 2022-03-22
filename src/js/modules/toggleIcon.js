import { countTodos } from "../services/utils";

export default class ToggleIcon {
    constructor(todosArr, completeAllBtn, filterPanel) {
        this.todosArr = todosArr;
        this.completeAllBtn = completeAllBtn;
        this.filterPanel = filterPanel;
    }

    render() {

        const { todosArr, completeAllBtn, filterPanel } = this;
        filterPanel.childNodes[1].innerText = `Total: ${countTodos(todosArr)}`;

        if (todosArr.length) {
            completeAllBtn.style.display = '';
            filterPanel.style.visibility = 'visible';
        } else {
            completeAllBtn.style.display = 'none';
            filterPanel.style.visibility = 'hidden';
        }
    }
}