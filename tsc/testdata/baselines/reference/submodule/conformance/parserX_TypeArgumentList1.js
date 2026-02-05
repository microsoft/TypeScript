//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/TypeArgumentLists/parserX_TypeArgumentList1.ts] ////

//// [parserX_TypeArgumentList1.ts]
Foo<A,B,\ C>(4, 5, 6);

//// [parserX_TypeArgumentList1.js]
"use strict";
Foo < A, B, ;
C > (4, 5, 6);
