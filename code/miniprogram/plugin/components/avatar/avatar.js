require("../../runtime");
require("../../common");
require("../../vendors");
require("../../taro");

(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["plugin/components/avatar/avatar"],{

/***/ "./node_modules/_babel-loader@8.2.1@babel-loader/lib/index.js!./src/plugin/components/avatar/avatar.jsx":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/_babel-loader@8.2.1@babel-loader/lib!./src/plugin/components/avatar/avatar.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Avatar; });
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/_react@17.0.2@react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/_@tarojs_plugin-platform-weapp@3.3.9@@tarojs/plugin-platform-weapp/dist/components-react.js");
/* harmony import */ var _avatar_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./avatar.scss */ "./src/plugin/components/avatar/avatar.scss");
/* harmony import */ var _avatar_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_avatar_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wgtsStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../wgtsStore */ "./src/plugin/wgtsStore.js");
/* harmony import */ var _hoc_withInformation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../hoc/withInformation */ "./src/plugin/hoc/withInformation.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/_react@17.0.2@react/cjs/react-jsx-runtime.production.min.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);







var _dec, _class;



 // import { useCreateWgts } from '@p/spx/wgtsStore'





var Avatar = (_dec = Object(_hoc_withInformation__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(), _dec(_class = /*#__PURE__*/function (_Component) {
  Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Avatar, _Component);

  var _super = Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Avatar);

  function Avatar(props) {
    var _this;

    Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Avatar);

    _this = _super.call(this, props);

    Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_this), "propsDefault", {
      tData2: '233'
    });

    Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_this), "className", 'Avatar');

    console.log('Avatar', Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_this));
    console.log('tData', props);
    console.log('$w_store', _wgtsStore__WEBPACK_IMPORTED_MODULE_9__[/* $w_store */ "a"]);
    _this.state = {
      className: 'Avatar',
      d: _wgtsStore__WEBPACK_IMPORTED_MODULE_9__[/* $w_store */ "a"].wgts_store.tData
    };
    return _this;
  }

  Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Avatar, [{
    key: "render",
    value: function render() {
      var tData2 = this.state.tData2;
      return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsxs"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__[/* View */ "b"], {
        children: [tData2, /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__["jsx"])(_tarojs_components__WEBPACK_IMPORTED_MODULE_7__[/* Image */ "a"], {
          src: "http://storage.360buyimg.com/taro-static/static/images/logo.png"
        })]
      });
    }
  }]);

  return Avatar;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"])) || _class);


/***/ }),

/***/ "./src/plugin/components/avatar/avatar.jsx":
/*!*************************************************!*\
  !*** ./src/plugin/components/avatar/avatar.jsx ***!
  \*************************************************/
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
var component = __webpack_require__(/*! ../../../../node_modules/_babel-loader@8.2.1@babel-loader/lib!./avatar.jsx */ "./node_modules/_babel-loader@8.2.1@babel-loader/lib/index.js!./src/plugin/components/avatar/avatar.jsx").default
var config = {};
var inst = Component(Object(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_2__["createNativeComponentConfig"])(component, react__WEBPACK_IMPORTED_MODULE_3__, react_dom__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], config))



/***/ }),

/***/ "./src/plugin/components/avatar/avatar.scss":
/*!**************************************************!*\
  !*** ./src/plugin/components/avatar/avatar.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/plugin/hoc/withInformation.js":
/*!*******************************************!*\
  !*** ./src/plugin/hoc/withInformation.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return withInformation; });
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ "./node_modules/_@babel_runtime@7.15.4@@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _wgtsStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../wgtsStore */ "./src/plugin/wgtsStore.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils */ "./src/plugin/hoc/utils.js");









function getId(type) {
  var getCmp = _wgtsStore__WEBPACK_IMPORTED_MODULE_6__[/* $w_store */ "a"].getCmpList(type);
  console.log('getCmp', type, getCmp);

  for (var i in getCmp) {
    if (getCmp[i]) {
      _wgtsStore__WEBPACK_IMPORTED_MODULE_6__[/* $w_store */ "a"].setCmp(type, i, false);
      return i;
    }
  }
} // 子组件使用信道


function withInformation(targetCtx) {
  return function (Component) {
    return /*#__PURE__*/function (_Component) {
      Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(withInformationComponent, _Component);

      var _super = Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(withInformationComponent);

      function withInformationComponent(props) {
        var _this;

        Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, withInformationComponent);

        _this = _super.call(this, props);
        console.log('withInformationComponent:this', Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_this));
        console.log('withInformationComponent:props', _this.props);
        console.log('withInformationComponent:state', Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_this));

        var _assertThisInitialize = Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_this),
            className = _assertThisInitialize.className,
            propsDefault = _assertThisInitialize.propsDefault;

        if (className) {
          var id = getId(className);
          console.log('getCmp_id', id);

          var _loop = function _loop(i) {
            var key = className + '_' + i + '_' + id; //getRandwords()

            _wgtsStore__WEBPACK_IMPORTED_MODULE_6__[/* $w_store */ "a"].addListener(key, function (val) {
              console.log('change_this', Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(_this));
              console.log('withInformationComponent:change', i, key, val);

              _this.setState(Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, i, val));
            });
          };

          for (var i in propsDefault) {
            _loop(i);
          }
        } // 


        return _this;
      }

      Object(_Users_wangzhanyuan_code_bug_issues1_Bug_issues_code_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(withInformationComponent, [{
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

      return withInformationComponent;
    }(Component);
  };
}

/***/ })

},[["./src/plugin/components/avatar/avatar.jsx","plugin/runtime","plugin/taro","plugin/vendors","plugin/common"]]]);;
//# sourceMappingURL=avatar.js.map