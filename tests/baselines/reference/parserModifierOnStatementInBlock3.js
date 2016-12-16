//// [parserModifierOnStatementInBlock3.ts]
export function foo() {
   export function bar() {
   }
}


//// [parserModifierOnStatementInBlock3.js]
"use strict";
function foo() {
    export function bar() {
    }
}
exports.foo = foo;
