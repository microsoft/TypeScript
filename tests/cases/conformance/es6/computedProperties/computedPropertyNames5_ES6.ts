// @target: es6
// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
var b: boolean;
var v = {
    [b]: 0,
    [true]: 1,
    [[]]: 0,
    [{}]: 0,
    [undefined]: undefined,
    [null]: null
}