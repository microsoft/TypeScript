//// [tests/cases/compiler/jsFileCompilationNoErrorDeclarationsWithJsFileReferenceWithNoOut.ts] ////

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




//// [a.d.ts]
declare class c {
}
//// [c.d.ts]
declare function bar(): void;
//// [b.d.ts]
/// <reference path="c.d.ts" />
declare function foo(): void;


//// [DtsFileErrors]


tests/cases/compiler/b.d.ts(1,22): error TS6053: File 'tests/cases/compiler/c.d.ts' not found.


==== tests/cases/compiler/a.d.ts (0 errors) ====
    declare class c {
    }
    
==== tests/cases/compiler/b.d.ts (1 errors) ====
    /// <reference path="c.d.ts" />
                         ~~~~~~
!!! error TS6053: File 'tests/cases/compiler/c.d.ts' not found.
    declare function foo(): void;
    