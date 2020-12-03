//// [parserModifierOnStatementInBlock3.ts]
export function foo() {
   export function bar() {
   }
}


//// [parserModifierOnStatementInBlock3.js]
"use strict";
exports.__esModule = true;
exports.foo = void 0;
function foo() {
    export function bar() {
    }
}
exports.foo = foo;
