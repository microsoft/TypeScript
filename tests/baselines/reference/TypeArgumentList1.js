//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/TypeArgumentLists/TypeArgumentList1.ts] ////

//// [TypeArgumentList1.ts]
Foo<A,B,\ C>(4, 5, 6);

//// [TypeArgumentList1.js]
Foo < A, B, ;
C > (4, 5, 6);
