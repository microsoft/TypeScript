//// [tests/cases/compiler/optionalParameterProperty.ts] ////

//// [optionalParameterProperty.ts]
class C {
    p: number;
}

class D extends C { 
    constructor(public p?: number) {
        super();
    }
}


//// [optionalParameterProperty.js]
class C {
}
class D extends C {
    constructor(p) {
        super();
        this.p = p;
    }
}
