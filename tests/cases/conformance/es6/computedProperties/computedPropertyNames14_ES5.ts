// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
// @target: es5
var b: boolean;
class C {
    [b]() {}
    static [true]() { }
    [[]]() { }
    static [{}]() { }
    [undefined]() { }
    static [null]() { }
}