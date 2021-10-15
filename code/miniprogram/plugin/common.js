(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["plugin/common"],{

/***/ "./src/plugin/eventBus.js":
/*!********************************!*\
  !*** ./src/plugin/eventBus.js ***!
  \********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/classCallCheck.js");


var EventBus = function EventBus() {
  Object(_Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, EventBus);

  /**
   * 构造函数需要存储的 event 事件
   */
  this.events = this.events || new Object();
};
/**
 * @name emit
 * @description 触发事件
 * @param {*} type 事件类型
 * @param  {...any} args 参数
 */


EventBus.prototype.emit = function (type) {
  var eventFuncs = this.events[type]; // 查看这个 type 的 event 有多少个回调函数，如果有多个需要依次调用。

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (Array.isArray(eventFuncs)) {
    for (var index = 0; index < eventFuncs.length; index++) {
      eventFuncs[index].apply(this, args);
    }
  } else {
    eventFuncs.apply(this, args);
  }
};
/**
 * @name addEventListener
 * @description 增加监听函数
 * @param {*} type
 * @param {*} fun
 */


EventBus.prototype.addListener = function (type, func) {
  var eventFuncs = this.events[type]; // 如果从未注册过监听函数，则将函数放入数组存入对应的键名下

  if (!eventFuncs) {
    this.events[type] = [func];
  } // 如果注册过，则直接放入
  else {
    eventFuncs.push(func);
  }
};
/**
 * @name removeListener
 * @description 删除监听事件
 * @param {*} type
 */


EventBus.prototype.removeListener = function (type, func) {
  if (this.events[type]) {
    var eventFuncs = this.events[type];

    if (Array.isArray(eventFuncs)) {
      if (func) {
        var funcIndex = eventFuncs.findIndex(function (eventFunc) {
          return func === eventFunc;
        });

        if (funcIndex !== -1) {
          eventFuncs.splice(funcIndex, 1);
        } else {
          console.warn("eventBus may remove unexit func(".concat(type, ")"));
        }
      } else {
        delete eventFuncs[type];
      }
    } else {
      delete eventFuncs[type];
    }
  }
}; // const eventBus = new EventBus();
// eventBus.addListener("test", function (...args) {
// console.log('test',args);
// });
// eventBus.addListener("test", function (...args) {
//   console.log('test2',args);
//   });
// eventBus.emit("test", [1, 3]);


/* harmony default export */ __webpack_exports__["a"] = (new EventBus());

/***/ }),

/***/ "./src/plugin/hoc/utils.js":
/*!*********************************!*\
  !*** ./src/plugin/hoc/utils.js ***!
  \*********************************/
/*! exports provided: rand, getRandwords */
/*! exports used: getRandwords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export rand */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRandwords; });
//getrand
function rand(max) {
  return Math.floor(Math.random() * max);
} //getRandwords 获取随机字符串

function getRandwords() {
  var ls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
  var chars = '';
  var passwords = [];
  var passwordUnique = true;
  var quantity = 1;
  chars += '0123456789';
  chars += 'abcdefghijklmnopqrstuvwxyz';
  chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  while (passwords.length < quantity) {
    var _chars = chars.split('');

    var password = '';

    for (var i = 0, l = ls; i < l; i++) {
      if (_chars.length < 1) break;
      var idx = rand(_chars.length);
      password += _chars[idx];
      if (passwordUnique) _chars.splice(idx, 1);
    }

    if (passwords.indexOf(password) === -1) passwords.push(password);
  }

  return passwords.join('\n');
}

/***/ }),

/***/ "./src/plugin/wgtsStore.js":
/*!*********************************!*\
  !*** ./src/plugin/wgtsStore.js ***!
  \*********************************/
/*! exports provided: $w_store, useCreateWgts */
/*! exports used: $w_store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(window) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return $w_store; });
/* unused harmony export useCreateWgts */
/* harmony import */ var _Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.2@react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _eventBus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./eventBus */ "./src/plugin/eventBus.js");







var WgtsStore = /*#__PURE__*/function () {
  function WgtsStore() {
    Object(_Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, WgtsStore);

    Object(_Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this, "wgts_store", {
      __cmp_map: {}
    });

    Object(_Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this, "self", null);
  }

  Object(_Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(WgtsStore, [{
    key: "set",
    value: function set(key, val) {
      this.wgts_store[key] = val;
    } // 对于组件队列的读写;

  }, {
    key: "setCmp",
    value: function setCmp(type, key, val) {
      if (!this.wgts_store.__cmp_map[type]) {
        this.wgts_store.__cmp_map[type] = Object(_Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({}, key, val);
      } else {
        this.wgts_store.__cmp_map[type][key] = val;
      }
    }
  }, {
    key: "getCmp",
    value: function getCmp(type, key) {
      return this.wgts_store.__cmp_map[type][key];
    } // 获取组件code map；

  }, {
    key: "getCmpList",
    value: function getCmpList(type) {
      return this.wgts_store.__cmp_map[type];
    }
  }, {
    key: "addListener",
    value: function addListener(key, fn) {
      _eventBus__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].addListener(key, fn);
    }
  }, {
    key: "emit",
    value: function emit(key, arg) {
      _eventBus__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].emit(key, arg);
    }
  }, {
    key: "showEvent",
    value: function showEvent() {
      console.log('EventBus', _eventBus__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.wgts_store[key];
    }
  }], [{
    key: "create",
    value: function create() {
      if (!this.self || window.wgts_store) {
        this.self = new WgtsStore();
        window.wgts_store = this.self;
      }

      return this.self || window.wgts_store;
    }
  }]);

  return WgtsStore;
}();

function getStore() {
  return WgtsStore.create();
}

var $w_store = getStore();

function useCreateWgtsFn() {
  var refId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  //console.log('useCreateWgtsFn----value----->', value)
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_4__["useState"])(value),
      _useState2 = Object(_Users_wangzhanyuan_code_taro_project_test_wxPlugin_wxplugin_test_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState, 2),
      wgt_value = _useState2[0],
      _setValue = _useState2[1];

  $w_store.wgts_store[refId] = wgt_value;

  var setValue = function setValue(_value) {
    console.log('setValue__value', _value);
    $w_store.wgts_store[refId] = _value;
    return _setValue(_value);
  };

  return [wgt_value, setValue];
} // eslint-disable-next-line import/prefer-default-export


var useCreateWgts = useCreateWgtsFn;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @tarojs/runtime */ "./node_modules/_@tarojs_runtime@3.3.9@@tarojs/runtime/dist/runtime.esm.js")["window"]))

/***/ })

}]);
//# sourceMappingURL=common.js.map