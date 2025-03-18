//// [tests/cases/compiler/collisionThisExpressionAndModuleInGlobal.ts] ////

//// [collisionThisExpressionAndModuleInGlobal.ts]
module _this { //Error
    class c {
    }
}
var f = () => this;

//// [collisionThisExpressionAndModuleInGlobal.js]
var _this;
(function (_this) {
    class c {
    }
})(_this || (_this = {}));
var f = () => this;
