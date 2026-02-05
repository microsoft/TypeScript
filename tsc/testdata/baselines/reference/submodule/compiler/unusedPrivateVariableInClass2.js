//// [tests/cases/compiler/unusedPrivateVariableInClass2.ts] ////

//// [unusedPrivateVariableInClass2.ts]
class greeter {
    private x: string;
    private y: string;
}

//// [unusedPrivateVariableInClass2.js]
"use strict";
class greeter {
    x;
    y;
}
