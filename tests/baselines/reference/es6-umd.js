//// [tests/cases/compiler/es6-umd.ts] ////

//// [es6-umd.ts]
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

//// [es6-umd.js]
"use strict";
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
