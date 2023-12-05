//// [tests/cases/compiler/topLevelLambda3.ts] ////

//// [topLevelLambda3.ts]
var f = () => {this.window;}

//// [topLevelLambda3.js]
var _this = this;
var f = function () { _this.window; };
