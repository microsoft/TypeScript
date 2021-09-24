//// [topLevelLambda3.ts]
var f = () => {this.window;}

//// [topLevelLambda3.js]
var _this = this;
var f = function f() { _this.window; };
