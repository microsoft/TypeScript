//// [tests/cases/conformance/salsa/typeFromPropertyAssignment31.ts] ////

//// [typeFromPropertyAssignment31.ts]
function ExpandoMerge(n: number): number {
    return n;
}
ExpandoMerge.p1 = 111
ExpandoMerge.m = function(n: number) {
    return n + 1;
}
namespace ExpandoMerge {
    export var p2 = 222;
}
ExpandoMerge.p4 = 44444; // ok
ExpandoMerge.p6 = 66666; // ok
ExpandoMerge.p8 = false; // type error
namespace ExpandoMerge {
    export var p3 = 333;
    export var p4 = 4;
    export var p5 = 5;
    export let p6 = 6;
    export let p7 = 7;
    export var p8 = 6;
    export let p9 = 7;
}
ExpandoMerge.p5 = 555555; // ok
ExpandoMerge.p7 = 777777; // ok
ExpandoMerge.p9 = false; // type error
var n: number = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.p5 + ExpandoMerge.p6 + ExpandoMerge.p7 + ExpandoMerge.p8 + ExpandoMerge.p9 + ExpandoMerge.m(12) + ExpandoMerge(1001);


/// [Declarations] ////



//// [typeFromPropertyAssignment31.d.ts]
declare function ExpandoMerge(n: number): number;
declare namespace ExpandoMerge {
    var p2: number;
}
declare namespace ExpandoMerge {
    var p3: number;
    var p4: number;
    var p5: number;
    let p6: number;
    let p7: number;
    var p8: number;
    let p9: number;
}
declare var n: number;
/// [Errors] ////

typeFromPropertyAssignment31.ts(1,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
typeFromPropertyAssignment31.ts(13,1): error TS2322: Type 'boolean' is not assignable to type 'number'.
typeFromPropertyAssignment31.ts(25,1): error TS2322: Type 'boolean' is not assignable to type 'number'.


==== typeFromPropertyAssignment31.ts (3 errors) ====
    function ExpandoMerge(n: number): number {
             ~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        return n;
    }
    ExpandoMerge.p1 = 111
    ExpandoMerge.m = function(n: number) {
        return n + 1;
    }
    namespace ExpandoMerge {
        export var p2 = 222;
    }
    ExpandoMerge.p4 = 44444; // ok
    ExpandoMerge.p6 = 66666; // ok
    ExpandoMerge.p8 = false; // type error
    ~~~~~~~~~~~~~~~
!!! error TS2322: Type 'boolean' is not assignable to type 'number'.
    namespace ExpandoMerge {
        export var p3 = 333;
        export var p4 = 4;
        export var p5 = 5;
        export let p6 = 6;
        export let p7 = 7;
        export var p8 = 6;
        export let p9 = 7;
    }
    ExpandoMerge.p5 = 555555; // ok
    ExpandoMerge.p7 = 777777; // ok
    ExpandoMerge.p9 = false; // type error
    ~~~~~~~~~~~~~~~
!!! error TS2322: Type 'boolean' is not assignable to type 'number'.
    var n: number = ExpandoMerge.p1 + ExpandoMerge.p2 + ExpandoMerge.p3 + ExpandoMerge.p4 + ExpandoMerge.p5 + ExpandoMerge.p6 + ExpandoMerge.p7 + ExpandoMerge.p8 + ExpandoMerge.p9 + ExpandoMerge.m(12) + ExpandoMerge(1001);
    