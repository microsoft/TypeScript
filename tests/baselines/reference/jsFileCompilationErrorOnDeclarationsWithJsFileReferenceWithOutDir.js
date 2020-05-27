//// [tests/cases/compiler/jsFileCompilationErrorOnDeclarationsWithJsFileReferenceWithOutDir.ts] ////

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

//// [a.js]
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
//// [c.js]
function bar() {
}
//// [b.js]
/// <reference path="c.js"/>
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
