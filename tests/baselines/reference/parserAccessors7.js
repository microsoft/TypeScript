//// [tests/cases/conformance/parser/ecmascript5/Accessors/parserAccessors7.ts] ////

//// [parserAccessors7.ts]
var v = { get foo(v: number) { } };

//// [parserAccessors7.js]
var v = { get foo(v) { } };
