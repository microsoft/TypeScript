//// [fatarrowfunctionsErrors.ts]
foo((...Far:any[])=>{return 0;})
foo((1)=>{return 0;}); 
foo((x?)=>{return x;})
foo((x=0)=>{return x;})
var y = x:number => x*x;
false? (() => null): null;

// missing fatarrow
var x1 = () :void {};
var x2 = (a:number) :void {};
var x3 = (a:number) {};
var x4= (...a: any[]) { };

//// [fatarrowfunctionsErrors.js]
foo(function () {
    var Far = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Far[_i] = arguments[_i];
    }
    return 0;
});
foo((1), { "return": 0 });
foo(function (x) { return x; });
foo(function (x) {
    if (x === void 0) { x = 0; }
    return x;
});
var y = x, number;
x * x;
false ? (function () { return null; }) : null;
// missing fatarrow
var x1 = function () { };
var x2 = function (a) { };
var x3 = function (a) { };
var x4 = function () {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
};
