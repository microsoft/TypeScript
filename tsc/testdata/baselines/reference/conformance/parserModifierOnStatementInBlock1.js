//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserModifierOnStatementInBlock1.ts] ////

//// [parserModifierOnStatementInBlock1.ts]
export function foo() {
   export var x = this;
}


//// [parserModifierOnStatementInBlock1.js]
export function foo() {
    export var x = this;
}
