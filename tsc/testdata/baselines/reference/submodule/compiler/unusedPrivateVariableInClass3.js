//// [tests/cases/compiler/unusedPrivateVariableInClass3.ts] ////

//// [unusedPrivateVariableInClass3.ts]
class greeter {
    private x: string;
    private y: string;
    public  z: string;
}

//// [unusedPrivateVariableInClass3.js]
"use strict";
class greeter {
    x;
    y;
    z;
}
