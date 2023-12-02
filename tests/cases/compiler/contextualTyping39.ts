// @isolatedDeclarationDiffReason: TS normalizes types
var foo = <{ (): number; }> function() { return "err"; };