//// [tests/cases/compiler/staticClassProps.ts] ////

//// [staticClassProps.ts]
class C
{
    public foo() {
        static z = 1;
    }
}



//// [staticClassProps.js]
"use strict";
class C {
    foo() {
    }
    static z = 1;
}
