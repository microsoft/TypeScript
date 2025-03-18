//// [tests/cases/compiler/recursiveSpecializationOfSignatures.ts] ////

//// [recursiveSpecializationOfSignatures.ts]
class S0<B, A> {
set S1(S2: S0<any,any>) {
}
constructor(public S17: S0<any, (S18) => A>) { }
}


//// [recursiveSpecializationOfSignatures.js]
class S0 {
    S17;
    set S1(S2) {
    }
    constructor(S17) {
        this.S17 = S17;
    }
}
