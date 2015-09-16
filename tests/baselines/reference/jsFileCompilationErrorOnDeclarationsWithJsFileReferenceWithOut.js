//// [tests/cases/compiler/jsFileCompilationErrorOnDeclarationsWithJsFileReferenceWithOut.ts] ////

//// [a.ts]
class c {
}

//// [b.ts]
/// <reference path="c.js"/>
// error on above reference when emitting declarations
function foo() {
}

//// [c.js]
function bar() {
}

//// [out.js]
var c = (function () {
    function c() {
    }
    return c;
})();
/// <reference path="c.js"/>
// error on above reference when emitting declarations
function foo() {
}
