// @target: es5
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
