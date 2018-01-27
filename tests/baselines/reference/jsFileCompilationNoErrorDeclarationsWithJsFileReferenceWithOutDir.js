//// [tests/cases/compiler/jsFileCompilationNoErrorDeclarationsWithJsFileReferenceWithOutDir.ts] ////

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


//// [DtsFileErrors]


outDir/b.d.ts(1,22): error TS6053: File 'outDir/c.d.ts' not found.


==== outDir/a.d.ts (0 errors) ====
    declare class c {
    }
    
==== outDir/b.d.ts (1 errors) ====
    /// <reference path="c.d.ts" />
                         ~~~~~~
!!! error TS6053: File 'outDir/c.d.ts' not found.
    declare function foo(): void;
    