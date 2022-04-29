//// [defaultValueInFunctionOverload1.ts]
function foo(x: string = '');
function foo(x = '') { }

//// [defaultValueInFunctionOverload1.js]
function foo(x) {
    if (x === void 0) { x = ''; }
}
