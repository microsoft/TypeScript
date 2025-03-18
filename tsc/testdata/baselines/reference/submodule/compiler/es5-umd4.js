//// [tests/cases/compiler/es5-umd4.ts] ////

//// [es5-umd4.ts]
class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}

export = A;


//// [es5-umd4.js]
"use strict";
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
module.exports = A;
