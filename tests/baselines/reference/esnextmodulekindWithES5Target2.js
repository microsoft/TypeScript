//// [tests/cases/conformance/externalModules/esnext/esnextmodulekindWithES5Target2.ts] ////

//// [esnextmodulekindWithES5Target2.ts]
export default class C {
    static s = 0;
    p = 1;
    method() { }
}


//// [esnextmodulekindWithES5Target2.js]
class C {
    constructor() {
        this.p = 1;
    }
    method() { }
}
C.s = 0;
export default C;
