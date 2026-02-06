//// [tests/cases/compiler/es6-amd.ts] ////

//// [es6-amd.ts]
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

//// [es6-amd.js]
"use strict";
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
