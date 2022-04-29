//// [tests/cases/compiler/jsFileCompilationDuplicateVariable.ts] ////

//// [a.ts]
var x = 10;

//// [b.js]
var x = "hello"; // Error is recorded here, but suppressed because the js file isn't checked


//// [out.js]
var x = 10;
var x = "hello"; // Error is recorded here, but suppressed because the js file isn't checked


//// [out.d.ts]
declare var x: number;
declare var x: string;


//// [DtsFileErrors]


out.d.ts(2,13): error TS2403: Subsequent variable declarations must have the same type.  Variable 'x' must be of type 'number', but here has type 'string'.


==== out.d.ts (1 errors) ====
    declare var x: number;
    declare var x: string;
                ~
!!! error TS2403: Subsequent variable declarations must have the same type.  Variable 'x' must be of type 'number', but here has type 'string'.
!!! related TS6203 out.d.ts:1:13: 'x' was also declared here.
    