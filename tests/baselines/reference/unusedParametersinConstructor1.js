//// [tests/cases/compiler/unusedParametersinConstructor1.ts] ////

//// [unusedParametersinConstructor1.ts]
class greeter {
    constructor(param1: string) {
    }
}

//// [unusedParametersinConstructor1.js]
"use strict";
class greeter {
    constructor(param1) {
    }
}
