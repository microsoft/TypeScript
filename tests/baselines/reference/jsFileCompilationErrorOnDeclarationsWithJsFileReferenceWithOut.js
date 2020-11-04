//// [tests/cases/compiler/jsFileCompilationErrorOnDeclarationsWithJsFileReferenceWithOut.ts] ////

//// [a.ts]
class c {
}

//// [b.ts]
/// <reference path="c.js"/>
function foo() {
}

//// [c.js]
function bar() {
}


//// [out.js]
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
function bar() {
}
/// <reference path="c.js"/>
function foo() {
}


//// [out.d.ts]
declare class c {
}
declare function bar(): void;
declare function foo(): void;
