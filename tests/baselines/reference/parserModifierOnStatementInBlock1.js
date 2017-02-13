//// [parserModifierOnStatementInBlock1.ts]
export function foo() {
   export var x = this;
}


//// [parserModifierOnStatementInBlock1.js]
"use strict";
exports.__esModule = true;
function foo() {
    export var x = this;
}
exports.foo = foo;
