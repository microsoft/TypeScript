//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
var v = { [e]: 1, [e + e]: 2 };