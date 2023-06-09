//// [tests/cases/conformance/parser/ecmascript5/Generics/parserConstructorAmbiguity1.ts] ////

//// [parserConstructorAmbiguity1.ts]
new Date<A;

//// [parserConstructorAmbiguity1.js]
new Date < A;
