// @declaration: true
// @isolatedDeclarationDiffReason: TS normalizes types. Removes duplicate properties.
// @isolatedDeclarationFixedDiffReason: Syntactically invalid. Duplicate property

let x = {} as {a: number; a: number};