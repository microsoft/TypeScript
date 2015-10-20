//// [tests/cases/compiler/jsFileCompilationErrorOnDeclarationsWithJsFileReferenceWithNoOut.ts] ////

//// [a.ts]
class c {
}

//// [b.ts]
/// <reference path="c.js"/>
// error on above reference path when emitting declarations
function foo() {
}

//// [c.js]
function bar() {
}

//// [a.js]
var c = (function () {
    function c() {
    }
    return c;
})();
//// [b.js]
/// <reference path="c.js"/>
// error on above reference path when emitting declarations
function foo() {
}
