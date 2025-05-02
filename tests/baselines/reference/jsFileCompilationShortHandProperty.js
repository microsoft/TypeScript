//// [tests/cases/compiler/jsFileCompilationShortHandProperty.ts] ////

//// [a.js]
function foo() {
    var a = 10;
    var b = "Hello";
    return {
        a,
        b
    };
}


//// [out.js]
function foo() {
    var a = 10;
    var b = "Hello";
    return {
        a: a,
        b: b
    };
}
