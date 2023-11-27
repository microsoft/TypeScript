//// [tests/cases/compiler/declarationEmitFunctionKeywordProp.ts] ////

//// [declarationEmitFunctionKeywordProp.ts]
function foo(): void {}
foo.null = true;

function bar(): void {}
bar.async = true;
bar.normal = false;

function baz(): void {}
baz.class = true;
baz.normal = false;

/// [Declarations] ////



//// [declarationEmitFunctionKeywordProp.d.ts]
declare function foo(): void;
declare function bar(): void;
declare function baz(): void;
//# sourceMappingURL=declarationEmitFunctionKeywordProp.d.ts.map
/// [Errors] ////

declarationEmitFunctionKeywordProp.ts(2,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitFunctionKeywordProp.ts(5,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitFunctionKeywordProp.ts(6,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitFunctionKeywordProp.ts(9,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitFunctionKeywordProp.ts(10,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== declarationEmitFunctionKeywordProp.ts (5 errors) ====
    function foo(): void {}
    foo.null = true;
    ~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    function bar(): void {}
    bar.async = true;
    ~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    bar.normal = false;
    ~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    function baz(): void {}
    baz.class = true;
    ~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    baz.normal = false;
    ~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.