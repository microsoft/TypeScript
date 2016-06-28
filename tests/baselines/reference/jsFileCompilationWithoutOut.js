//// [tests/cases/compiler/jsFileCompilationWithoutOut.ts] ////

//// [a.ts]
class c {
}

//// [b.js]
function foo() {
}


//// [a.js]
var c = (function () {
    function c() {
    }
    return c;
}());
