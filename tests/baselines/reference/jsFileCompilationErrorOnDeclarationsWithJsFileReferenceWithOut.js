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
}());
function bar() {
}
/// <reference path="c.js"/>
// error on above reference when emitting declarations
function foo() {
}


//// [out.d.ts]
declare class c {
}
declare function foo(): void;
