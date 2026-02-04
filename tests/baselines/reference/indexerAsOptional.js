//// [tests/cases/compiler/indexerAsOptional.ts] ////

//// [indexerAsOptional.ts]
interface indexSig {
    //Index signatures can't be optional
    [idx?: number]: any; //err
}

class indexSig2 {
    //Index signatures can't be optional
    [idx?: number]: any //err
}

//// [indexerAsOptional.js]
"use strict";
class indexSig2 {
}
