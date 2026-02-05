//// [tests/cases/compiler/restParamModifier.ts] ////

//// [restParamModifier.ts]
class C {
    constructor(...public rest: string[]) {}
}

//// [restParamModifier.js]
"use strict";
class C {
    constructor(...public, rest) { }
}
