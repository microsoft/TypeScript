//// [tests/cases/conformance/salsa/propertyAssignmentUseParentType3.ts] ////

//// [propertyAssignmentUseParentType3.ts]
// don't use the parent type if it's a function declaration (#33741)

function foo1(): number {
    return 123;
}
foo1.toFixed = "";

function foo2(): any[] {
    return [];
}
foo2.join = "";

function foo3(): string {
    return "";
}
foo3.trim = "";

function foo4(): ({x: number}) {
    return {x: 123};
}
foo4.x = "456";


/// [Declarations] ////



//// [/.src/propertyAssignmentUseParentType3.d.ts]
declare function foo1(): number;
declare function foo2(): any[];
declare function foo3(): string;
declare function foo4(): ({
    x: number;
});
/// [Errors] ////

propertyAssignmentUseParentType3.ts(3,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
propertyAssignmentUseParentType3.ts(8,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
propertyAssignmentUseParentType3.ts(13,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
propertyAssignmentUseParentType3.ts(18,10): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== propertyAssignmentUseParentType3.ts (4 errors) ====
    // don't use the parent type if it's a function declaration (#33741)
    
    function foo1(): number {
             ~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        return 123;
    }
    foo1.toFixed = "";
    
    function foo2(): any[] {
             ~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        return [];
    }
    foo2.join = "";
    
    function foo3(): string {
             ~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        return "";
    }
    foo3.trim = "";
    
    function foo4(): ({x: number}) {
             ~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
        return {x: 123};
    }
    foo4.x = "456";
    