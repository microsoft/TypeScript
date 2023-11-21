//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
var obj = {
    [Symbol.for]: 0
};

obj[Symbol.for];