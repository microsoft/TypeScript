//// [tests/cases/compiler/declareIdentifierAsBeginningOfStatementExpression01.ts] ////

//// [declareIdentifierAsBeginningOfStatementExpression01.ts]
class C {
}

var declare: any;

declare instanceof C;

//// [declareIdentifierAsBeginningOfStatementExpression01.js]
"use strict";
class C {
}
var declare;
declare instanceof C;
