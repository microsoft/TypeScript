//// [tests/cases/compiler/duplicateVarsAcrossFileBoundaries.ts] ////

//// [duplicateVarsAcrossFileBoundaries_0.ts]
var x = 3;
var y = "";

//// [duplicateVarsAcrossFileBoundaries_1.ts]
var x = true;
var z = 3;

//// [duplicateVarsAcrossFileBoundaries_2.ts]
var x = "";
var y = 3;
var z = false;

//// [duplicateVarsAcrossFileBoundaries_3.ts]
var x = 0;
var y = "";
var z = 0;

//// [duplicateVarsAcrossFileBoundaries_4.ts]
module P { }
import p = P;
var q;

//// [duplicateVarsAcrossFileBoundaries_5.ts]
module Q { }
import q = Q;
var p;

/// [Declarations] ////



//// [duplicateVarsAcrossFileBoundaries_0.d.ts]
declare var x: number;
declare var y: string;

//// [duplicateVarsAcrossFileBoundaries_1.d.ts]
declare var x: number;
declare var z: number;

//// [duplicateVarsAcrossFileBoundaries_2.d.ts]
declare var x: number;
declare var y: string;
declare var z: number;

//// [duplicateVarsAcrossFileBoundaries_3.d.ts]
declare var x: number;
declare var y: string;
declare var z: number;

//// [duplicateVarsAcrossFileBoundaries_4.d.ts]
declare namespace P { }
import p = P;
declare var q: invalid;

//// [duplicateVarsAcrossFileBoundaries_5.d.ts]
declare namespace Q { }
import q = Q;
declare var p: invalid;

/// [Errors] ////

duplicateVarsAcrossFileBoundaries_1.ts(1,5): error TS2403: Subsequent variable declarations must have the same type.  Variable 'x' must be of type 'number', but here has type 'boolean'.
duplicateVarsAcrossFileBoundaries_2.ts(1,5): error TS2403: Subsequent variable declarations must have the same type.  Variable 'x' must be of type 'number', but here has type 'string'.
duplicateVarsAcrossFileBoundaries_2.ts(2,5): error TS2403: Subsequent variable declarations must have the same type.  Variable 'y' must be of type 'string', but here has type 'number'.
duplicateVarsAcrossFileBoundaries_2.ts(3,5): error TS2403: Subsequent variable declarations must have the same type.  Variable 'z' must be of type 'number', but here has type 'boolean'.
duplicateVarsAcrossFileBoundaries_4.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
duplicateVarsAcrossFileBoundaries_5.ts(3,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== duplicateVarsAcrossFileBoundaries_0.ts (0 errors) ====
    var x = 3;
    var y = "";
    
==== duplicateVarsAcrossFileBoundaries_1.ts (1 errors) ====
    var x = true;
        ~
!!! error TS2403: Subsequent variable declarations must have the same type.  Variable 'x' must be of type 'number', but here has type 'boolean'.
!!! related TS6203 duplicateVarsAcrossFileBoundaries_0.ts:1:5: 'x' was also declared here.
    var z = 3;
    
==== duplicateVarsAcrossFileBoundaries_2.ts (3 errors) ====
    var x = "";
        ~
!!! error TS2403: Subsequent variable declarations must have the same type.  Variable 'x' must be of type 'number', but here has type 'string'.
!!! related TS6203 duplicateVarsAcrossFileBoundaries_0.ts:1:5: 'x' was also declared here.
    var y = 3;
        ~
!!! error TS2403: Subsequent variable declarations must have the same type.  Variable 'y' must be of type 'string', but here has type 'number'.
!!! related TS6203 duplicateVarsAcrossFileBoundaries_0.ts:2:5: 'y' was also declared here.
    var z = false;
        ~
!!! error TS2403: Subsequent variable declarations must have the same type.  Variable 'z' must be of type 'number', but here has type 'boolean'.
!!! related TS6203 duplicateVarsAcrossFileBoundaries_1.ts:2:5: 'z' was also declared here.
    
==== duplicateVarsAcrossFileBoundaries_3.ts (0 errors) ====
    var x = 0;
    var y = "";
    var z = 0;
    
==== duplicateVarsAcrossFileBoundaries_4.ts (1 errors) ====
    module P { }
    import p = P;
    var q;
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    
==== duplicateVarsAcrossFileBoundaries_5.ts (1 errors) ====
    module Q { }
    import q = Q;
    var p;
        ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.