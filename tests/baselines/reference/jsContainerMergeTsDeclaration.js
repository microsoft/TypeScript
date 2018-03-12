//// [tests/cases/conformance/salsa/jsContainerMergeTsDeclaration.ts] ////

//// [a.js]
var /*1*/x = function foo() {
}
x.a = function bar() {
}
//// [b.ts]
var x = function () {
    return 1;
}();


//// [b.js]
var x = function () {
    return 1;
}();
