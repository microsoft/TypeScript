//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserModifierOnStatementInBlock1.ts] ////

//// [parserModifierOnStatementInBlock1.ts]
export function foo() {
   export var x = this;
}


//// [parserModifierOnStatementInBlock1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() {
    export var x = this;
}
