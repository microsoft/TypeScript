//// [tests/cases/compiler/typeOfSuperCall.ts] ////

//// [typeOfSuperCall.ts]
class C {
}

class D extends C {
    constructor() {
        var x: void = super();
    }
}

//// [typeOfSuperCall.js]
"use strict";
class C {
}
class D extends C {
    constructor() {
        var x = super();
    }
}
