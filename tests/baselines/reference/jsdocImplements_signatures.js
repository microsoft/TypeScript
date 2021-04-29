//// [tests/cases/conformance/jsdoc/jsdocImplements_signatures.ts] ////

//// [defs.d.ts]
interface Sig {
    [index: string]: string
}
//// [a.js]
/** @implements {Sig} */
class B  {
}




//// [a.d.ts]
/** @implements {Sig} */
declare class B implements Sig {
}
