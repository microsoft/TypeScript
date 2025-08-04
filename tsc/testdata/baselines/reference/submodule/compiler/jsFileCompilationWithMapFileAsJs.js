//// [tests/cases/compiler/jsFileCompilationWithMapFileAsJs.ts] ////

//// [a.ts]
class c {
}

//// [b.js.map]
function foo() {
}

//// [b.js]
function bar() {
}

//// [a.js]
class c {
}
//# sourceMappingURL=a.js.map