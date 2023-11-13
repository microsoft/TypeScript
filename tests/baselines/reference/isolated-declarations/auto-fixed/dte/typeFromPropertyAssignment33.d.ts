//// [tests/cases/conformance/salsa/typeFromPropertyAssignment33.ts] ////

//// [ns.ts]
namespace ExpandoMerge {
    export var p3 = 333;
    export var p4 = 4;
    export var p5 = 5;
    export let p6 = 6;
    export let p7 = 7;
    export var p8 = 6;
    export let p9 = 7;
}
namespace ExpandoMerge {
    export var p2 = 222;
}


//// [expando.ts]
function ExpandoMerge(n: number): number {
    return n;
}
ExpandoMerge.p1 = 111
ExpandoMerge.m = function(n: number) {
    return n + 1;
}
ExpandoMerge.p4 = 44444;
ExpandoMerge.p5 = 555555;
ExpandoMerge.p6 = 66666;
ExpandoMerge.p7 = 777777;
ExpandoMerge.p8 = false; // type error
ExpandoMerge.p9 = false; // type error
var n: number = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.p5 + ExpandoMerge.p6 + ExpandoMerge.p7 + ExpandoMerge.p8 + ExpandoMerge.p9 + ExpandoMerge.m(12) + ExpandoMerge(1001);



/// [Declarations] ////



//// [expando.d.ts]
declare function ExpandoMerge(n: number): number;
declare var n: number;

//// [ns.d.ts]
declare namespace ExpandoMerge {
    var p3: number;
    var p4: number;
    var p5: number;
    let p6: number;
    let p7: number;
    var p8: number;
    let p9: number;
}
declare namespace ExpandoMerge {
    var p2: number;
}

/// [Errors] ////

expando.ts(1,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
expando.ts(12,1): error TS2322: Type 'boolean' is not assignable to type 'number'.
expando.ts(13,1): error TS2322: Type 'boolean' is not assignable to type 'number'.
ns.ts(1,11): error TS2433: A namespace declaration cannot be in a different file from a class or function with which it is merged.
ns.ts(10,11): error TS2433: A namespace declaration cannot be in a different file from a class or function with which it is merged.


==== ns.ts (2 errors) ====
    namespace ExpandoMerge {
              ~~~~~~~~~~~~
!!! error TS2433: A namespace declaration cannot be in a different file from a class or function with which it is merged.
        export var p3 = 333;
        export var p4 = 4;
        export var p5 = 5;
        export let p6 = 6;
        export let p7 = 7;
        export var p8 = 6;
        export let p9 = 7;
    }
    namespace ExpandoMerge {
              ~~~~~~~~~~~~
!!! error TS2433: A namespace declaration cannot be in a different file from a class or function with which it is merged.
        export var p2 = 222;
    }
    
    
==== expando.ts (3 errors) ====
    function ExpandoMerge(n: number): number {
             ~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        return n;
    }
    ExpandoMerge.p1 = 111
    ExpandoMerge.m = function(n: number) {
        return n + 1;
    }
    ExpandoMerge.p4 = 44444;
    ExpandoMerge.p5 = 555555;
    ExpandoMerge.p6 = 66666;
    ExpandoMerge.p7 = 777777;
    ExpandoMerge.p8 = false; // type error
    ~~~~~~~~~~~~~~~
!!! error TS2322: Type 'boolean' is not assignable to type 'number'.
    ExpandoMerge.p9 = false; // type error
    ~~~~~~~~~~~~~~~
!!! error TS2322: Type 'boolean' is not assignable to type 'number'.
    var n: number = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.p5 + ExpandoMerge.p6 + ExpandoMerge.p7 + ExpandoMerge.p8 + ExpandoMerge.p9 + ExpandoMerge.m(12) + ExpandoMerge(1001);
    
    