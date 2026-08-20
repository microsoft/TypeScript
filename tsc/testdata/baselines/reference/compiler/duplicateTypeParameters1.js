//// [tests/cases/compiler/duplicateTypeParameters1.ts] ////

//// [duplicateTypeParameters1.ts]
function A<X, X>() { }


//// [duplicateTypeParameters1.js]
"use strict";
function A() { }
