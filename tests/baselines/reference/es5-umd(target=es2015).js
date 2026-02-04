//// [tests/cases/compiler/es5-umd.ts] ////

//// [es5-umd.ts]
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


//// [es5-umd.js]
"use strict";
class A {
    constructor() {
    }
    B() {
        return 42;
    }
}
