//// [tests/cases/conformance/parser/ecmascript5/Generics/parserAmbiguity3.ts] ////

//// [parserAmbiguity3.ts]
f(g < A, B > +(7));

//// [parserAmbiguity3.js]
f(g < A, B > +(7));
