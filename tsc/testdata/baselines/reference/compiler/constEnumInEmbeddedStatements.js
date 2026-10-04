//// [tests/cases/compiler/constEnumInEmbeddedStatements.ts] ////

//// [constEnumInEmbeddedStatements.ts]
function t(x: number) {
    if (x)
        /* before E */ const enum E { A = 1 } /* after E */
}


//// [constEnumInEmbeddedStatements.js]
"use strict";
function t(x) {
    if (x)
        /* before E */ ; /* after E */
}
