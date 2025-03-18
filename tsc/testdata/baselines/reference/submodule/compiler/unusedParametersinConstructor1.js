//// [tests/cases/compiler/unusedParametersinConstructor1.ts] ////

//// [unusedParametersinConstructor1.ts]
class greeter {
    constructor(param1: string) {
    }
}

//// [unusedParametersinConstructor1.js]
class greeter {
    constructor(param1) {
    }
}
