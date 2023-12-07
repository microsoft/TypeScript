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
declare namespace errorOnAssignmentBelowDecl {
    var a: string;
}
declare const errorOnAssignmentBelow: {
    (): void;
    a: string;
};
declare const errorOnMissingReturn: {
    (): void;
    a: string;
};
//# sourceMappingURL=isolatedDeclarationErrors.d.ts.map