//// [tests/cases/conformance/declarationEmit/exportDefaultNamespace.ts] ////

//// [exportDefaultNamespace.ts]
export default function someFunc(): string {
    return 'hello!';
}

someFunc.someProp = 'yo';


/// [Declarations] ////



//// [exportDefaultNamespace.d.ts]
export default function someFunc(): string;
//# sourceMappingURL=exportDefaultNamespace.d.ts.map
/// [Errors] ////

exportDefaultNamespace.ts(5,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== exportDefaultNamespace.ts (1 errors) ====
    export default function someFunc(): string {
        return 'hello!';
    }
    
    someFunc.someProp = 'yo';
    ~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    