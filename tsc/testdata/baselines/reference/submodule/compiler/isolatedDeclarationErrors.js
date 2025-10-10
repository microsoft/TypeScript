//// [tests/cases/compiler/isolatedDeclarationErrors.ts] ////

//// [isolatedDeclarationErrors.ts]
function errorOnAssignmentBelowDecl(): void {}
errorOnAssignmentBelowDecl.a = "";

const errorOnAssignmentBelow = (): void => {}
errorOnAssignmentBelow.a = "";

const errorOnMissingReturn = () => {}
errorOnMissingReturn.a = "";


//// [isolatedDeclarationErrors.js]
function errorOnAssignmentBelowDecl() { }
errorOnAssignmentBelowDecl.a = "";
const errorOnAssignmentBelow = () => { };
errorOnAssignmentBelow.a = "";
const errorOnMissingReturn = () => { };
errorOnMissingReturn.a = "";


//// [isolatedDeclarationErrors.d.ts]
declare function errorOnAssignmentBelowDecl(): void;
declare namespace errorOnAssignmentBelowDecl {
    var a: string;
}
declare function errorOnAssignmentBelow(): void;
declare namespace errorOnAssignmentBelow {
    var a: string;
}
declare function errorOnMissingReturn(): void;
declare namespace errorOnMissingReturn {
    var a: string;
}
