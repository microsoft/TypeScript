//// [tests/cases/conformance/declarationEmit/exportDefaultNamespace.ts] ////

//// [exportDefaultNamespace.ts]
export default function someFunc(): string {
    return 'hello!';
}

someFunc.someProp = 'yo';


/// [Declarations] ////



//// [exportDefaultNamespace.d.ts]
export default function someFunc(): string;

/// [Errors] ////

exportDefaultNamespace.ts(1,25): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== exportDefaultNamespace.ts (1 errors) ====
    export default function someFunc(): string {
                            ~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        return 'hello!';
    }
    
    someFunc.someProp = 'yo';
    