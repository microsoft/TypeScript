// @declaration: true
// @isolatedDeclarations: true
// @isolatedDeclarationFixedDiffReason: Can't auto-fix expando functions.
// @target: ESNext

function errorOnAssignmentBelowDecl(): void {}
errorOnAssignmentBelowDecl.a = "";

const errorOnAssignmentBelow = (): void => {}
errorOnAssignmentBelow.a = "";

const errorOnMissingReturn = () => {}
errorOnMissingReturn.a = "";
