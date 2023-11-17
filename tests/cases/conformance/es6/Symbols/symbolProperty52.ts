//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
var obj = {
    [Symbol.nonsense]: 0
};

obj = {};

obj[Symbol.nonsense];