//// [tests/cases/compiler/isolatedDeclarationErrors.ts] ////

//// [isolatedDeclarationErrors.ts]
function errorOnAssignmentBelowDecl(): void {}
errorOnAssignmentBelowDecl.a = "";

const errorOnAssignmentBelow: {
    (): void;
    a: string;
} = (): void => {}
errorOnAssignmentBelow.a = "";

const errorOnMissingReturn: {
    (): void;
    a: string;
} = () => {}
errorOnMissingReturn.a = "";


/// [Declarations] ////



//// [isolatedDeclarationErrors.d.ts]
declare function errorOnAssignmentBelowDecl(): void;
declare const errorOnAssignmentBelow: {
    (): void;
    a: string;
};
declare const errorOnMissingReturn: {
    (): void;
    a: string;
};
//# sourceMappingURL=isolatedDeclarationErrors.d.ts.map
/// [Errors] ////

isolatedDeclarationErrors.ts(2,1): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== isolatedDeclarationErrors.ts (1 errors) ====
    function errorOnAssignmentBelowDecl(): void {}
    errorOnAssignmentBelowDecl.a = "";
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    
    const errorOnAssignmentBelow: {
        (): void;
        a: string;
    } = (): void => {}
    errorOnAssignmentBelow.a = "";
    
    const errorOnMissingReturn: {
        (): void;
        a: string;
    } = () => {}
    errorOnMissingReturn.a = "";
    