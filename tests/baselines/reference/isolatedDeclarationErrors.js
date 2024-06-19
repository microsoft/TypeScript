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
