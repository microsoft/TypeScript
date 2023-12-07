//// [tests/cases/compiler/isolatedDeclarationErrors.ts] ////

//// [isolatedDeclarationErrors.ts]
function Foo(): void {}
Foo.a = "";

const fn = (): void => {}
fn.a = "";

/// [Declarations] ////



//// [isolatedDeclarationErrors.d.ts]
declare function Foo(): void;
declare const fn: {
    (): void;
    a: string;
};

/// [Errors] ////

isolatedDeclarationErrors.ts(2,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
isolatedDeclarationErrors.ts(5,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== isolatedDeclarationErrors.ts (2 errors) ====
    function Foo(): void {}
    Foo.a = "";
    ~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    const fn = (): void => {}
    fn.a = "";
    ~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.