//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserEmptyParenthesizedExpression1.ts] ////

//// [parserEmptyParenthesizedExpression1.ts]
function getObj() {
   ().toString();
}

//// [parserEmptyParenthesizedExpression1.js]
function getObj() {
    ().toString();
}
