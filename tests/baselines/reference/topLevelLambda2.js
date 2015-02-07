//// [topLevelLambda2.ts]
function foo(x:any) {}

foo(()=>this.window);

//// [topLevelLambda2.js]
var _this = this;
function foo(x) { }
foo(function () { return _this.window; });
