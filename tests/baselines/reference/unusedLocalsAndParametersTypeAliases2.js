//// [tests/cases/compiler/unusedLocalsAndParametersTypeAliases2.ts] ////

//// [unusedLocalsAndParametersTypeAliases2.ts]
// unused
type handler1 = () => void;


function foo() {
    type handler2 = () => void;
    foo();
}

export {}

//// [unusedLocalsAndParametersTypeAliases2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo() {
    foo();
}
