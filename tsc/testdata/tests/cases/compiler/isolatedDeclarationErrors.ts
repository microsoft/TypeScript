// @declaration: true
// @isolatedDeclarations: true
// @target: ESNext

function errorOnAssignmentBelowDecl(): void {}
errorOnAssignmentBelowDecl.a = "";

const errorOnAssignmentBelow = (): void => {}
errorOnAssignmentBelow.a = "";

const errorOnMissingReturn = () => {}
errorOnMissingReturn.a = "";
