//// [tests/cases/conformance/parser/ecmascript5/Generics/parserAmbiguity2.ts] ////

//// [parserAmbiguity2.ts]
f(g<A, B>7);

//// [parserAmbiguity2.js]
"use strict";
f(g < A, B > 7);
