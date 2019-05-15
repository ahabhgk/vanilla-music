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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_font_iconfont_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _style_font_iconfont_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_font_iconfont_css__WEBPACK_IMPORTED_MODULE_1__);

 // 防止输入框弹出改变页面大小

window.onload = function () {
  document.body.style.height = "".concat(window.screen.availHeight, "px");
}; // 页面滚动切换


function changeClass(page, removed, added) {
  page.classList.remove(removed);
  page.classList.add(added);
}

function rollUp() {
  var prev = document.querySelector('.prev');
  var active = document.querySelector('.active');
  var next = document.querySelector('.next');
  next.classList.add('hidden');
  setTimeout(function () {
    next.classList.remove('hidden');
  }, 500);
  changeClass(prev, 'prev', 'active');
  changeClass(active, 'active', 'next');
  changeClass(next, 'next', 'prev');
}

function rollDown() {
  var prev = document.querySelector('.prev');
  var active = document.querySelector('.active');
  var next = document.querySelector('.next');
  prev.classList.add('hidden');
  setTimeout(function () {
    prev.classList.remove('hidden');
  }, 500);
  changeClass(next, 'next', 'active');
  changeClass(active, 'active', 'prev');
  changeClass(prev, 'prev', 'next');
}

var upBtns = document.querySelectorAll('.up-btn');
var downBtns = document.querySelectorAll('.down-btn');
upBtns.forEach(function (btn) {
  btn.addEventListener('click', rollUp);
});
downBtns.forEach(function (btn) {
  btn.addEventListener('click', rollDown);
}); // 搜索栏的弹出和隐藏

var drop = document.querySelector('#drop');
var dropIcon = drop.querySelector('span');
var searchWrap = document.querySelector('.search-wrap');
var isDroped = false;

function dropSearch() {
  if (isDroped) {
    searchWrap.classList.remove('drop-out');
    dropIcon.classList.remove('icon-doubleleft');
    dropIcon.classList.add('icon-doubleright');
    isDroped = !isDroped;
  } else {
    searchWrap.classList.add('drop-out');
    dropIcon.classList.remove('icon-doubleright');
    dropIcon.classList.add('icon-doubleleft');
    isDroped = !isDroped;
  }
}

drop.addEventListener('click', dropSearch); // 搜索框进行请求

function debounce(fn, wait) {
  var timeout;
  return function () {
    var _this = this;

    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(_this, arg);
    }, wait);
  };
}

function searching() {
  var keywords = this.value;
  fetch("/search?keywords=".concat(keywords)).then(function (data) {
    return data.json();
  }).then(function (res) {
    return console.log(res);
  })["catch"](function (e) {
    console.log(e);
  });
}

var search = document.querySelector('#search');
search.addEventListener('input', debounce(searching, 500)); // 标题的影子效果

var firstPage = document.querySelector('#vanilla');
var tit = document.querySelector('#vanilla>.tit');
var WALK = 200;

function shadow(e) {
  var width = firstPage.offsetWidth,
      height = firstPage.offsetHeight;
  var _e$targetTouches$ = e.targetTouches[0],
      x = _e$targetTouches$.pageX,
      y = _e$targetTouches$.pageY;
  var xWalk = Math.round(x / width * WALK - WALK / 2);
  var yWalk = Math.round(y / height * WALK - WALK / 2);
  tit.style.textShadow = "".concat(xWalk, "px ").concat(yWalk, "px 0 rgba(0, 255, 0, 0.7)");
}

firstPage.addEventListener('touchmove', shadow);
firstPage.addEventListener('touchend', function () {
  tit.style.textShadow = 'rgba(0, 255, 0, 0.7) -5px -5px 0';
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=main.58822fe3.js.map