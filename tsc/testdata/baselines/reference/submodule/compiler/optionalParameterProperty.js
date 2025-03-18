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
    p;
}
class D extends C {
    p;
    constructor(p) {
        this.p = p;
        super();
    }
}
