//@target: ES6
//@isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
var s = Symbol();
var x = {
    [s]: 0,
    [s]() { },
    get [s]() {
        return 0;
    }
}