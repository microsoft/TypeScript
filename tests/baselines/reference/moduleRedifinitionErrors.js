//// [tests/cases/compiler/moduleRedifinitionErrors.ts] ////

//// [moduleRedifinitionErrors.ts]
class A {
}
module A {
}


//// [moduleRedifinitionErrors.js]
class A {
}
