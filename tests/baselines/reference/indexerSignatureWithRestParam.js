//// [tests/cases/compiler/indexerSignatureWithRestParam.ts] ////

//// [indexerSignatureWithRestParam.ts]
interface I {
    [...x]: string;
}

class C {
    [...x]: string
}

//// [indexerSignatureWithRestParam.js]
class C {
}
