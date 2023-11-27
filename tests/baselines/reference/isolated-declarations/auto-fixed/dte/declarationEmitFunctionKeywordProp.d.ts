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

declarationEmitFunctionKeywordProp.ts(1,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitFunctionKeywordProp.ts(4,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
declarationEmitFunctionKeywordProp.ts(8,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== declarationEmitFunctionKeywordProp.ts (3 errors) ====
    function foo(): void {}
             ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    foo.null = true;
    
    function bar(): void {}
             ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    bar.async = true;
    bar.normal = false;
    
    function baz(): void {}
             ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    baz.class = true;
    baz.normal = false;