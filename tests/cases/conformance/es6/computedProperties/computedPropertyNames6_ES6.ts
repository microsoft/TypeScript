// @target: es6
// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
var p1: number | string;
var p2: number | number[];
var p3: string | boolean;
var v = {
    [p1]: 0,
    [p2]: 1,
    [p3]: 2
}