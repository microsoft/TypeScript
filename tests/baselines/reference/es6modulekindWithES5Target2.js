//// [tests/cases/conformance/externalModules/es6/es6modulekindWithES5Target2.ts] ////

//// [es6modulekindWithES5Target2.ts]
export default class C {
    static s = 0;
    p = 1;
    method() { }
}


//// [es6modulekindWithES5Target2.js]
let C = (() => {
    class C {
        constructor() {
            this.p = 1;
        }
        method() { }
    }
    C.s = 0;
    return C;
})();
export default C;
