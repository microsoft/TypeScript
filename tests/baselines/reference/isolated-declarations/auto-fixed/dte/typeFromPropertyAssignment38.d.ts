//// [tests/cases/conformance/salsa/typeFromPropertyAssignment38.ts] ////

//// [typeFromPropertyAssignment38.ts]
function F(): void {}
F["prop"] = 3;

const f: {
    (): void;
    prop: number;
} = function () {};
f["prop"] = 3;


/// [Declarations] ////



//// [/.src/typeFromPropertyAssignment38.d.ts]
declare function F(): void;
declare const f: {
    (): void;
    prop: number;
};
/// [Errors] ////

typeFromPropertyAssignment38.ts(1,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== typeFromPropertyAssignment38.ts (1 errors) ====
    function F(): void {}
             ~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    F["prop"] = 3;
    
    const f: {
        (): void;
        prop: number;
    } = function () {};
    f["prop"] = 3;
    