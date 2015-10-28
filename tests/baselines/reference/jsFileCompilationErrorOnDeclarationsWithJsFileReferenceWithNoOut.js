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


//// [a.d.ts]
declare class c {
}
//// [c.d.ts]
declare function bar(): void;
//// [b.d.ts]
/// <reference path="c.d.ts" />
declare function foo(): void;
