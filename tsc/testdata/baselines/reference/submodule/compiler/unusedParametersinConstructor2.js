//// [tests/cases/compiler/unusedParametersinConstructor2.ts] ////

//// [unusedParametersinConstructor2.ts]
class greeter {
    constructor(param1: string, param2: string) {
        param2 = param2 + "dummy value";
    }
}

//// [unusedParametersinConstructor2.js]
class greeter {
    constructor(param1, param2) {
        param2 = param2 + "dummy value";
    }
}
