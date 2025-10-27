//// [tests/cases/compiler/topLevelLambda4.ts] ////

//// [topLevelLambda4.ts]
export var x = () => this.window;

//// [topLevelLambda4.js]
var _this = this;
export var x = function () { return _this.window; };
