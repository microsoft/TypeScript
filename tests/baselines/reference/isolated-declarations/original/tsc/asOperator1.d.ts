//// [tests/cases/conformance/expressions/asOperator/asOperator1.ts] ////

//// [asOperator1.ts]
var as = 43;
var x = undefined as number;
var y = (null as string).length;
var z = Date as any as string;

// Should parse as a union type, not a bitwise 'or' of (32 as number) and 'string'
var j = 32 as number|string;
j = '';


/// [Declarations] ////



//// [asOperator1.d.ts]
declare var as: number;
declare var x: number;
declare var y: invalid;
declare var z: string;
declare var j: string | number;

/// [Errors] ////

asOperator1.ts(3,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== asOperator1.ts (1 errors) ====
    var as = 43;
    var x = undefined as number;
    var y = (null as string).length;
            ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    var z = Date as any as string;
    
    // Should parse as a union type, not a bitwise 'or' of (32 as number) and 'string'
    var j = 32 as number|string;
    j = '';
    