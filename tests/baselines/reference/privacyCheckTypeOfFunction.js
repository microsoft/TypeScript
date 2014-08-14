//// [privacyCheckTypeOfFunction.ts]
function foo() {
}
export var x: typeof foo;
export var b = foo;


//// [privacyCheckTypeOfFunction.js]
function foo() {
}
exports.x;
exports.b = foo;


//// [privacyCheckTypeOfFunction.d.ts]
export declare var x: () => void;
export declare var b: () => void;
