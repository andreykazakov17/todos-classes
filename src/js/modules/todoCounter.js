import { countTodos } from '../services/utils';

export default class TodoCounter {
    constructor(filterPanel) {
        this.filterPanel = filterPanel;
    }

    render() {
        this.filterPanel.childNodes[1].innerText = `Total: ${countTodos()}`;
    }
}