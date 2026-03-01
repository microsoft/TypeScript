//// [tests/cases/compiler/collisionThisExpressionAndModuleInGlobal.ts] ////

//// [collisionThisExpressionAndModuleInGlobal.ts]
namespace _this { //Error
    class c {
    }
}
var f = () => this;

//// [collisionThisExpressionAndModuleInGlobal.js]
"use strict";
var _this;
(function (_this) {
    class c {
    }
})(_this || (_this = {}));
var f = () => this;
