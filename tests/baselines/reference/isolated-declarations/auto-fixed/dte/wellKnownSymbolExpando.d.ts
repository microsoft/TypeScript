//// [tests/cases/compiler/wellKnownSymbolExpando.ts] ////

//// [wellKnownSymbolExpando.ts]
function f(): void {}
f[Symbol.iterator] = function() {}


/// [Declarations] ////



//// [/.src/wellKnownSymbolExpando.d.ts]
declare function f(): void;
/// [Errors] ////

wellKnownSymbolExpando.ts(1,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== wellKnownSymbolExpando.ts (1 errors) ====
    function f(): void {}
             ~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    f[Symbol.iterator] = function() {}
    