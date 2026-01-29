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
class indexSig2 {
}
