//// [tests/cases/conformance/parser/ecmascript5/Generics/parserConstructorAmbiguity4.ts] ////

//// [parserConstructorAmbiguity4.ts]
new Date<A ? B : C

//// [parserConstructorAmbiguity4.js]
"use strict";
new Date < A ? B : C;
