//// [tests/cases/conformance/es6/yieldExpressions/generatorInAmbientContext5.ts] ////

//// [generatorInAmbientContext5.ts]
class C {
    *generator(): any { }
}

//// [generatorInAmbientContext5.js]
class C {
    *generator() { }
}
