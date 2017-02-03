//// [parserModifierOnStatementInBlock1.ts]
export function foo() {
   export var x = this;
}


//// [parserModifierOnStatementInBlock1.js]
"use strict";
function foo() {
    export var x = this;
}
exports.foo = foo;
exports.__esModule = true;
