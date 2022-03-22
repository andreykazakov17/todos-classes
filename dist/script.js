/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/main */ "./src/js/modules/main.js");

const todosArr = [{
  "text": "1",
  "completed": false,
  "id": 1647947347955
}, {
  "text": "2",
  "completed": false,
  "id": 1647947348238
}, {
  "text": "3",
  "completed": false,
  "id": 1647947348488
}]; //const todosArr = [];

window.addEventListener('DOMContentLoaded', () => {
  const todos = new _modules_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    todoInput: '.todo-input',
    todoButton: '.todo-button',
    todoList: '.todo-list',
    completeAllBtn: '.complete-all-btn',
    filterPanel: '.todo-filters',
    clearCompletedBtn: '.todo-clear',
    filtersList: '.todo-filters-list'
  });
  todos.render();
});

/***/ }),

/***/ "./src/js/modules/main.js":
/*!********************************!*\
  !*** ./src/js/modules/main.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Main; });
/* harmony import */ var _toggleIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toggleIcon */ "./src/js/modules/toggleIcon.js");
/* harmony import */ var _todoList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todoList */ "./src/js/modules/todoList.js");
/* harmony import */ var _services_localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/localStorage */ "./src/js/services/localStorage.js");
/* harmony import */ var _services_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/utils */ "./src/js/services/utils.js");




class Main {
  constructor() {
    let {
      todoInput = null,
      todoButton = null,
      todoList = null,
      completeAllBtn = null,
      filterPanel = null,
      clearCompletedBtn = null,
      filtersList = null,
      todosArr = [],
      filter = 'all'
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
    this.filter = Object(_services_utils__WEBPACK_IMPORTED_MODULE_3__["activeFilter"])(e);
    this.render();
  }

  onClickHandler(e) {
    const {
      todoInput
    } = this;
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

    if (e.target.dataset.trash !== 'trash' && e.target.dataset.clear !== 'clear-all') {
      return;
    }

    deleteTodo(id);
    this.render();

    if (this.todosArr.length === 0) {
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
    const newTodo = Object(_services_utils__WEBPACK_IMPORTED_MODULE_3__["createTodo"])(inputValue);
    this.todosArr.push(newTodo);
  }

  render() {
    const {
      todoInput,
      todoButton,
      todoList,
      completeAllBtn,
      filterPanel,
      clearCompletedBtn,
      filtersList,
      todosArr,
      filter
    } = this;
    console.log('Render!');
    console.log(this.todosArr);
    const toggleIcon = new _toggleIcon__WEBPACK_IMPORTED_MODULE_0__["default"](todosArr, completeAllBtn, filterPanel);
    const todosList = new _todoList__WEBPACK_IMPORTED_MODULE_1__["default"](todoList, todosArr, filter);
    toggleIcon.render();
    todosList.render();
  }

}
todoButton.addEventListener('click', undefined.onClickHandler);

/***/ }),

/***/ "./src/js/modules/todoItem.js":
/*!************************************!*\
  !*** ./src/js/modules/todoItem.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TodoItem; });
class TodoItem {
  constructor(_ref, todoList) {
    let {
      id,
      completed,
      text
    } = _ref;
    this.id = id;
    this.completed = completed;
    this.text = text;
    this.todoList = todoList;
  }

  render() {
    const {
      id,
      completed,
      text,
      todoList
    } = this;
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
    todoList.appendChild(newTodo); // Check button

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

    newTodo.prepend(completedBtn); // Trash button

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    trashBtn.classList.add('trash-btn');
    trashBtn.setAttribute('data-trash', 'trash');
    newTodo.appendChild(trashBtn);
  }

}

/***/ }),

/***/ "./src/js/modules/todoList.js":
/*!************************************!*\
  !*** ./src/js/modules/todoList.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TodoList; });
/* harmony import */ var _todoItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoItem */ "./src/js/modules/todoItem.js");

class TodoList {
  constructor(todoList, todosArr, filter) {
    this.todoList = todoList;
    this.todosArr = todosArr;
    this.filter = filter;
  }

  filterTodos(items) {
    switch (this.filter) {
      case "active":
        return items.filter(item => !item.completed);

      case "completed":
        return items.filter(item => item.completed);

      default:
        return items;
    }
  }

  render() {
    const {
      todoList,
      todosArr,
      filter
    } = this;
    todoList.innerHTML = '';
    this.filterTodos(todosArr, filter).forEach(item => {
      const todoItem = new _todoItem__WEBPACK_IMPORTED_MODULE_0__["default"](item, todoList);
      todoItem.render();
    });
  }

}

/***/ }),

/***/ "./src/js/modules/toggleIcon.js":
/*!**************************************!*\
  !*** ./src/js/modules/toggleIcon.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ToggleIcon; });
/* harmony import */ var _services_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/utils */ "./src/js/services/utils.js");

class ToggleIcon {
  constructor(todosArr, completeAllBtn, filterPanel) {
    this.todosArr = todosArr;
    this.completeAllBtn = completeAllBtn;
    this.filterPanel = filterPanel;
  }

  render() {
    const {
      todosArr,
      completeAllBtn,
      filterPanel
    } = this;
    filterPanel.childNodes[1].innerText = `Total: ${Object(_services_utils__WEBPACK_IMPORTED_MODULE_0__["countTodos"])(todosArr)}`;

    if (todosArr.length) {
      completeAllBtn.style.display = '';
      filterPanel.style.visibility = 'visible';
    } else {
      completeAllBtn.style.display = 'none';
      filterPanel.style.visibility = 'hidden';
    }
  }

}

/***/ }),

/***/ "./src/js/services/localStorage.js":
/*!*****************************************!*\
  !*** ./src/js/services/localStorage.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalStorage; });
class LocalStorage {
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setLocalStorage(key, data) {
    const serializedArr = JSON.stringify(data);
    localStorage.setItem(key, serializedArr);
  }

  clearLocalStorage() {
    localStorage.removeItem('todosArr');
  }

}

/***/ }),

/***/ "./src/js/services/utils.js":
/*!**********************************!*\
  !*** ./src/js/services/utils.js ***!
  \**********************************/
/*! exports provided: createTodo, countTodos, activeFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTodo", function() { return createTodo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countTodos", function() { return countTodos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activeFilter", function() { return activeFilter; });
const createTodo = text => ({
  text,
  completed: false,
  id: new Date().getTime()
});

const countTodos = todosArr => {
  return todosArr.length;
};

const activeFilter = e => {
  if (e.target.tagName !== 'BUTTON') return;

  for (let btn of Object.values(filtersList.children)) {
    btn.classList.remove('active-btn');
  }

  console.log(filter);
  e.target.classList.add('active-btn');
  return e.target.dataset['btn'];
};



/***/ })

/******/ });
//# sourceMappingURL=script.js.map