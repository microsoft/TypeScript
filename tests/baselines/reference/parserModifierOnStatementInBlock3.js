//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserModifierOnStatementInBlock3.ts] ////

//// [parserModifierOnStatementInBlock3.ts]
export function foo() {
   export function bar() {
   }
}


//// [parserModifierOnStatementInBlock3.js]
export function foo() {
    export function bar() {
    }
}
