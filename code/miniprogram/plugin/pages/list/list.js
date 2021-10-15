require("../../runtime");
require("../../common");
require("../../vendors");
require("../../taro");

(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["plugin/pages/list/list"],{

/***/ "./node_modules/_babel-loader@8.2.1@babel-loader/lib/index.js!./src/plugin/pages/list/list.jsx":
/*!********************************************************************************************!*\
  !*** ./node_modules/_babel-loader@8.2.1@babel-loader/lib!./src/plugin/pages/list/list.jsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.2@react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/_@tarojs_plugin-platform-weapp@3.3.9@@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _components_listItem_listItem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/listItem/listItem */ "./src/plugin/components/listItem/listItem.jsx");
/* harmony import */ var _wgtsStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../wgtsStore */ "./src/plugin/wgtsStore.js");
/* harmony import */ var _hoc_withInformationPost__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hoc/withInformationPost */ "./src/plugin/hoc/withInformationPost.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/_react@17.0.2@react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);







var _dec, _class;



 // import Avatar from '../../components/avatar/avatar'
// import './index.scss'





var Index = (_dec = Object(_hoc_withInformationPost__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(), _dec(_class = /*#__PURE__*/function (_Component) {
  Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Index, _Component);

  var _super = Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Index);

  function Index(props) {
    var _this;

    Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Index);

    _this = _super.call(this, props);

    Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_this), "state", {
      list: [{
        name: 'A',
        value: '1'
      }, {
        name: 'B',
        value: '2'
      }, {
        name: 'C',
        value: '3'
      }]
    });

    var t = 0;
    setInterval(function () {
      // $w_store.set('tData',t++)
      // console.log('setInterval',t)
      _wgtsStore__WEBPACK_IMPORTED_MODULE_9__[/* $w_store */ "a"].showEvent();
      _wgtsStore__WEBPACK_IMPORTED_MODULE_9__[/* $w_store */ "a"].emit('Avatar_tData2', t++);
    }, 3000);
    return _this;
  }

  Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Index, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxs"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__[/* View */ "b"], {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])("avatar", {
          bindStore: this.bindOnly('avatar', 0),
          id: "avatar1",
          tData: 222
        }), this.state.list.map(function (item) {
          return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(_components_listItem_listItem__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
            name: item.name,
            value: item.value
          }, item.name);
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])("avatar", {
          bindStore: this.bindOnly('avatar', 1),
          id: "avatar2",
          tData: 222
        })]
      });
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"])) || _class);


/***/ }),

/***/ "./src/plugin/components/listItem/listItem.jsx":
/*!*****************************************************!*\
  !*** ./src/plugin/components/listItem/listItem.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListItem; });
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.2@react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/_@tarojs_plugin-platform-weapp@3.3.9@@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _listItem_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./listItem.scss */ "./src/plugin/components/listItem/listItem.scss");
/* harmony import */ var _listItem_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_listItem_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/_react@17.0.2@react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);









var ListItem = /*#__PURE__*/function (_Component) {
  Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(ListItem, _Component);

  var _super = Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(ListItem);

  function ListItem() {
    Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, ListItem);

    return _super.apply(this, arguments);
  }

  Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(ListItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          value = _this$props.value;
      return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxs"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__[/* View */ "b"], {
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxs"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__[/* View */ "b"], {
          children: ["name: ", name]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__["jsxs"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_5__[/* View */ "b"], {
          children: ["value: ", value]
        })]
      });
    }
  }]);

  return ListItem;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);



/***/ }),

/***/ "./src/plugin/components/listItem/listItem.scss":
/*!******************************************************!*\
  !*** ./src/plugin/components/listItem/listItem.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/plugin/hoc/withInformationPost.js":
/*!***********************************************!*\
  !*** ./src/plugin/hoc/withInformationPost.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return withInformationPost; });
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _wgtsStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../wgtsStore */ "./src/plugin/wgtsStore.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils */ "./src/plugin/hoc/utils.js");






 //父组件信道

function withInformationPost(targetCtx) {
  return function (Component) {
    return /*#__PURE__*/function (_Component) {
      Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(withInformationPostComponent, _Component);

      var _super = Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(withInformationPostComponent);

      function withInformationPostComponent(props) {
        var _this;

        Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, withInformationPostComponent);

        _this = _super.call(this, props);
        var post = _this.setState;

        _this.setState = function () {
          for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
            arg[_key] = arguments[_key];
          }

          post.apply.apply(post, [Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_this)].concat(arg));
        }; // 本地存储一个 页面 -> 同类型组件 下表数组；用来缓存渲染历史；防止多次创建;


        _this.state['__cmpList'] = {}; // 

        return _this;
      } // 要保证 页面多次加载 缓存不冲突；


      Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(withInformationPostComponent, [{
        key: "bindOnly",
        value: function bindOnly(type, index) {
          console.log('生产id', Object(_utils__WEBPACK_IMPORTED_MODULE_6__[/* getRandwords */ "a"])());
          var __cmpList = this.state['__cmpList'][type];
          if (__cmpList && __cmpList.find(index) > -1) return;
          if (!__cmpList) this.state['__cmpList'][type] = [];
          var key = Object(_utils__WEBPACK_IMPORTED_MODULE_6__[/* getRandwords */ "a"])(); // this.state[key] = true

          _wgtsStore__WEBPACK_IMPORTED_MODULE_5__[/* $w_store */ "a"].setCmp(type, key, true);
          this.setState({
            __cmpList: this.state['__cmpList'][type].push(index)
          });
          console.log('__cmpList', __cmpList);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var _this2 = this;

          if (this.props.realCounter !== prevProps.virtualCounter) {
            this.props.realCounter = prevProps.virtualCounter;
            setTimeout(function () {
              _this2.forceUpdate(function () {
                // console.log('forceUpdate-run2',this.props)
                if (updatefetch && updatefetch.length) {
                  // console.log('updatefetch',updatefetch)
                  updatefetch.forEach(function (fn) {
                    return _this2[fn](prevProps);
                  });
                }
              });
            }, 100);
          }
        }
      }]);

      return withInformationPostComponent;
    }(Component);
  };
}

/***/ }),

/***/ "./src/plugin/pages/list/list.jsx":
/*!****************************************!*\
  !*** ./src/plugin/pages/list/list.jsx ***!
  \****************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tarojs_plugin_platform_weapp_dist_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/plugin-platform-weapp/dist/runtime */ "./node_modules/_@tarojs_plugin-platform-weapp@3.3.9@@tarojs/plugin-platform-weapp/dist/runtime.js");
/* harmony import */ var _tarojs_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/shared */ "./node_modules/_@tarojs_shared@3.3.9@@tarojs/shared/dist/shared.esm.js");
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/_@tarojs_runtime@3.3.9@@tarojs/runtime/dist/runtime.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.2@react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "./node_modules/_@tarojs_react@3.3.9@@tarojs/react/dist/react.esm.js");








var hooks = _tarojs_runtime__WEBPACK_IMPORTED_MODULE_2__["container"].get(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_2__["SERVICE_IDENTIFIER"].Hooks)
hooks.initNativeApiImpls = [_tarojs_shared__WEBPACK_IMPORTED_MODULE_1__[/* defaultReconciler */ "e"].initNativeApi]
var component = __webpack_require__(/*! ../../../../node_modules/_babel-loader@8.2.1@babel-loader/lib!./list.jsx */ "./node_modules/_babel-loader@8.2.1@babel-loader/lib/index.js!./src/plugin/pages/list/list.jsx").default
var config = {"usingComponents":{"avatar":"../../components/avatar/avatar"}};
var inst = Component(Object(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_2__["createNativeComponentConfig"])(component, react__WEBPACK_IMPORTED_MODULE_3__, react_dom__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], config))



/***/ })

},[["./src/plugin/pages/list/list.jsx","plugin/runtime","plugin/taro","plugin/vendors","plugin/common"]]]);;
//# sourceMappingURL=list.js.map