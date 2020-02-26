//// [privacyCheckTypeOfFunction.ts]
function foo() {
}
export var x: typeof foo;
export var b = foo;


//// [privacyCheckTypeOfFunction.js]
"use strict";
exports.__esModule = true;
function foo() {
}
exports.x = void 0;
exports.b = foo;


//// [privacyCheckTypeOfFunction.d.ts]
declare function foo(): void;
export declare var x: typeof foo;
export declare var b: typeof foo;
export {};
