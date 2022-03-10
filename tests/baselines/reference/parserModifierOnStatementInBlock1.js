//// [parserModifierOnStatementInBlock1.ts]
export function foo() {
   export var x = this;
}


//// [parserModifierOnStatementInBlock1.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function foo() {
    export var x = this;
}
exports.foo = foo;
