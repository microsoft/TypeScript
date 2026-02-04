//// [tests/cases/conformance/classes/classDeclarations/classInsideBlock.ts] ////

//// [classInsideBlock.ts]
function foo() {
    class C { }
}

//// [classInsideBlock.js]
"use strict";
function foo() {
    class C {
    }
}
