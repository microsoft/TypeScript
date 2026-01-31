//// [tests/cases/compiler/unusedLocalsinConstructor1.ts] ////

//// [unusedLocalsinConstructor1.ts]
class greeter {
    constructor() {
        var unused = 20;
    }
}

//// [unusedLocalsinConstructor1.js]
class greeter {
    constructor() {
        var unused = 20;
    }
}
