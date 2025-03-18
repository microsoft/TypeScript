//// [tests/cases/conformance/parser/ecmascript5/Protected/Protected9.ts] ////

//// [Protected9.ts]
class C {
   constructor(protected p) { }
}

//// [Protected9.js]
class C {
    p;
    constructor(p) {
        this.p = p;
    }
}
