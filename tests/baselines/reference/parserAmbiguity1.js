//// [tests/cases/conformance/parser/ecmascript5/Generics/parserAmbiguity1.ts] ////

//// [parserAmbiguity1.ts]
f(g<A, B>(7));

//// [parserAmbiguity1.js]
f(g(7));
