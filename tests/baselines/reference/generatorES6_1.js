//// [tests/cases/compiler/generatorES6_1.ts] ////

//// [generatorES6_1.ts]
function* foo() {
    yield
}

//// [generatorES6_1.js]
function* foo() {
    yield;
}
