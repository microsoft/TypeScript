//// [tests/cases/compiler/optionalParameterProperty.ts] ////

//// [optionalParameterProperty.ts]
class C {
    p: number = 0;
}

class D extends C { 
    constructor(public p?: number) {
        super();
    }
}


//// [optionalParameterProperty.js]
"use strict";
class C {
    p = 0;
}
class D extends C {
    p;
    constructor(p) {
        super();
        this.p = p;
    }
}
