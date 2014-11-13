//// [defaultValueInFunctionOverload1.ts]
function foo(x: string = '');
function foo(x = '') { }

//// [defaultValueInFunctionOverload1.js]
function foo() {
    var x = (arguments[0] === void 0) ? '' : arguments[0];
}
