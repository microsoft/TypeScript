//// [tests/cases/compiler/jsFileCompilationWithOut.ts] ////

//// [a.ts]
class c {
}

//// [b.js]
function foo() {
}


//// [out.js]
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
function foo() {
}
