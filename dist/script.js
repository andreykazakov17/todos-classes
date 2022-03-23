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
/* harmony import */ var _services_localStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/localStorage */ "./src/js/services/localStorage.js");


document.addEventListener('DOMContentLoaded', () => {
  const localStorage = new _services_localStorage__WEBPACK_IMPORTED_MODULE_1__["default"]();
  const todos = new _modules_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    todoInput: '.todo-input',
    todoButton: '.todo-button',
    todoList: '.todo-list',
    completeAllBtn: '.complete-all-btn',
    filterPanel: '.todo-filters',
    clearCompletedBtn: '.todo-clear',
    filtersList: '.todo-filters-list'
  });
  todos.todosArr = localStorage.getLocalStorage('todosArr') || [];
  todos.render();
  todos.initHandlers();
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Main {
  constructor() {
    let {
      todoInput: _todoInput = null,
      todoButton: _todoButton = null,
      todoList: _todoList = null,
      completeAllBtn: _completeAllBtn = null,
      filterPanel: _filterPanel = null,
      clearCompletedBtn: _clearCompletedBtn = null,
      filtersList: _filtersList = null,
      todosArr: _todosArr = [],
      filter: _filter = 'all'
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _defineProperty(this, "findTodoId", e => {
      const target = e.target;
      const todo = target.parentElement;
      return +todo.getAttribute('data-id');
    });

    _defineProperty(this, "addTodo", inputValue => {
      const newTodo = Object(_services_utils__WEBPACK_IMPORTED_MODULE_3__["createTodo"])(inputValue);
      this.todosArr.push(newTodo);
    });

    _defineProperty(this, "deleteTodo", id => {
      this.todosArr = this.todosArr.filter(item => item.id !== id);
    });

    _defineProperty(this, "checkTodo", id => {
      return this.todosArr.map(item => item.id === id ? { ...item,
        completed: !item.completed
      } : item);
    });

    _defineProperty(this, "checkAllTodos", todosArr => {
      return todosArr.map(item => {
        return { ...item,
          completed: true
        };
      });
    });

    _defineProperty(this, "uncheckAllTodos", todosArr => {
      return todosArr.map(item => {
        return { ...item,
          completed: false
        };
      });
    });

    _defineProperty(this, "toggleAllTodos", () => {
      const {
        todosArr
      } = this;
      const everyUnchecked = todosArr.every(item => !item.completed);
      const someChecked = todosArr.some(item => item.completed);
      const everyChecked = todosArr.every(item => item.completed);

      if (everyChecked) {
        this.todosArr = this.uncheckAllTodos(todosArr);
        return;
      }

      if (everyUnchecked || someChecked) {
        this.todosArr = this.checkAllTodos(todosArr);
        return;
      }
    });

    _defineProperty(this, "clearCompleted", () => {
      this.todosArr = this.todosArr.filter(item => !item.completed);
    });

    _defineProperty(this, "onFiltersHandler", e => {
      this.filter = Object(_services_utils__WEBPACK_IMPORTED_MODULE_3__["activeFilter"])(e, this.filtersList);
      this.render();
    });

    _defineProperty(this, "onClickHandler", e => {
      e.preventDefault();
      const {
        todoInput
      } = this;

      if (todoInput.value === '') {
        return;
      }

      this.addTodo(todoInput.value);
      todoInput.value = '';
      this.render();
    });

    _defineProperty(this, "onDeleteHandler", e => {
      const id = this.findTodoId(e);

      if (e.target.dataset.trash !== 'trash' && e.target.dataset.clear !== 'clear-all') {
        return;
      }

      this.deleteTodo(id);
      this.render();
    });

    _defineProperty(this, "onCheckHandler", e => {
      const id = this.findTodoId(e);

      if (!(e.target.dataset.complete === 'complete')) {
        return;
      }

      this.todosArr = this.checkTodo(id);
      this.render();
    });

    _defineProperty(this, "handleClear", localStorage => {
      this.clearCompleted();
      this.render();
      localStorage.clearLocalStorage('todosArr');
    });

    _defineProperty(this, "initHandlers", () => {
      const {
        todoButton,
        todoList,
        completeAllBtn,
        clearCompletedBtn,
        filtersList
      } = this;
      const localStorage = new _services_localStorage__WEBPACK_IMPORTED_MODULE_2__["default"]();
      todoButton.addEventListener('click', this.onClickHandler);
      todoList.addEventListener('click', this.onDeleteHandler);
      todoList.addEventListener('click', e => {
        this.onCheckHandler(e);
        localStorage.setLocalStorage('todosArr', this.todosArr);
      });
      completeAllBtn.addEventListener('click', e => {
        e.preventDefault();
        this.toggleAllTodos();
        this.render();
      });
      clearCompletedBtn.addEventListener('click', () => {
        this.handleClear(localStorage);
      });
      filtersList.addEventListener('click', e => {
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
    });

    _defineProperty(this, "render", () => {
      const {
        todoList,
        completeAllBtn,
        filterPanel,
        todosArr,
        filter
      } = this;
      const toggleIcon = new _toggleIcon__WEBPACK_IMPORTED_MODULE_0__["default"](todosArr, completeAllBtn, filterPanel);
      const todosList = new _todoList__WEBPACK_IMPORTED_MODULE_1__["default"](todoList, todosArr, filter);
      toggleIcon.render();
      todosList.render();
    });

    this.todoInput = document.querySelector(_todoInput);
    this.todoButton = document.querySelector(_todoButton);
    this.todoList = document.querySelector(_todoList);
    this.completeAllBtn = document.querySelector(_completeAllBtn);
    this.filterPanel = document.querySelector(_filterPanel);
    this.clearCompletedBtn = document.querySelector(_clearCompletedBtn);
    this.filtersList = document.querySelector(_filtersList);
    this.todosArr = _todosArr;
    this.filterBtns = Object.values(this.filtersList.children);
    this.filter = _filter;
  }

}

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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class TodoList {
  constructor(todoList, todosArr, filter) {
    _defineProperty(this, "filterTodos", items => {
      switch (this.filter) {
        case "active":
          return items.filter(item => !item.completed);

        case "completed":
          return items.filter(item => item.completed);

        default:
          return items;
      }
    });

    this.todoList = todoList;
    this.todosArr = todosArr;
    this.filter = filter;
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

const activeFilter = (e, filtersList) => {
  if (e.target.tagName !== 'BUTTON') return;

  for (let btn of Object.values(filtersList.children)) {
    btn.classList.remove('active-btn');
  }

  e.target.classList.add('active-btn');
  return e.target.dataset['btn'];
};



/***/ })

/******/ });
//# sourceMappingURL=script.js.map