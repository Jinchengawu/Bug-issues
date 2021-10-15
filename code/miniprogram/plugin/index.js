require("./runtime");
require("./common");
require("./vendors");
require("./taro");

module.exports=(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["plugin/index"],{

/***/ "./src/plugin/index.js":
/*!*****************************!*\
  !*** ./src/plugin/index.js ***!
  \*****************************/
/*! exports provided: sayHello, answer */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sayHello", function() { return sayHello; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "answer", function() { return answer; });
function sayHello() {
  console.log('Hello plugin!');
}
var answer = 42;

/***/ })

},[["./src/plugin/index.js","plugin/runtime"]]]);;
//# sourceMappingURL=index.js.map