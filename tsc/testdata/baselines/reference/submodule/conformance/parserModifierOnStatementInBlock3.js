//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserModifierOnStatementInBlock3.ts] ////

//// [parserModifierOnStatementInBlock3.ts]
export function foo() {
   export function bar() {
   }
}


//// [parserModifierOnStatementInBlock3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    export function bar() {
    }
}
