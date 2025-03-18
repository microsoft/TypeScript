//// [tests/cases/compiler/constructorWithSuperAndPrologue.es5.ts] ////

//// [constructorWithSuperAndPrologue.es5.ts]
// https://github.com/microsoft/TypeScript/issues/48761
"use strict";

class A {
    public constructor() {
        console.log("A")
    }
}

class B extends A  {
    constructor() {
        "ngInject";
        console.log("B")
        super();
    }
}


//// [constructorWithSuperAndPrologue.es5.js]
"use strict";
class A {
    constructor() {
        console.log("A");
    }
}
class B extends A {
    constructor() {
        "ngInject";
        "ngInject";
        console.log("B");
        super();
    }
}
