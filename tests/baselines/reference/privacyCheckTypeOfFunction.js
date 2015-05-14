//// [privacyCheckTypeOfFunction.ts]
function foo() {
}
export var x: typeof foo;
export var b = foo;


//// [privacyCheckTypeOfFunction.js]
function foo() {
}
exports.b = foo;
