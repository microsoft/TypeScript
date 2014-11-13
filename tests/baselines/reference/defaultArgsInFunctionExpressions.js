//// [defaultArgsInFunctionExpressions.ts]
var f = function (a = 3) { return a; }; // Type should be (a?: number) => number
var n: number = f(4);
n = f();
var s: string = f('');
s = f();

// Type check the default argument with the type annotation
var f2 = function (a: string = 3) { return a; }; // Should error, but be of type (a: string) => string;
s = f2('');
s = f2();
n = f2();

// Contextually type the default arg with the type annotation
var f3 = function (a: (s: string) => any = (s) => <number>s) { };

// Type check using the function's contextual type
var f4: (a: number) => void = function (a = "") { };

// Contextually type the default arg using the function's contextual type
var f5: (a: (s: string) => any) => void = function (a = s => <number>s) { };

// Instantiated module
module T { }
module U {
    export var x;
}

var f6 = (t = T) => { };
var f7 = (t = U) => { return t; };

f7().x;

//// [defaultArgsInFunctionExpressions.js]
var f = function () {
    var a = (arguments[0] === void 0) ? 3 : arguments[0];
    return a;
}; // Type should be (a?: number) => number
var n = f(4);
n = f();
var s = f('');
s = f();
// Type check the default argument with the type annotation
var f2 = function () {
    var a = (arguments[0] === void 0) ? 3 : arguments[0];
    return a;
}; // Should error, but be of type (a: string) => string;
s = f2('');
s = f2();
n = f2();
// Contextually type the default arg with the type annotation
var f3 = function () {
    var a = (arguments[0] === void 0) ? function (s) { return s; } : arguments[0];
};
// Type check using the function's contextual type
var f4 = function () {
    var a = (arguments[0] === void 0) ? "" : arguments[0];
};
// Contextually type the default arg using the function's contextual type
var f5 = function () {
    var a = (arguments[0] === void 0) ? function (s) { return s; } : arguments[0];
};
var U;
(function (U) {
    U.x;
})(U || (U = {}));
var f6 = function () {
    var t = (arguments[0] === void 0) ? T : arguments[0];
};
var f7 = function () {
    var t = (arguments[0] === void 0) ? U : arguments[0];
    return t;
};
f7().x;
