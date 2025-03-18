//// [tests/cases/compiler/parse2.ts] ////

//// [parse2.ts]
function foo() {
 foo(
}

//// [parse2.js]
function foo() {
    foo();
}
