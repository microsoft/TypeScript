// @target: es6
// @isolatedDeclarationDiffReason: Invalid computed property can only be detected by TSC
class C {
    static staticProp = 10;
    get [C.staticProp]() {
        return "hello";
    }
    set [C.staticProp](x: string) {
        var y = x;
    }
    [C.staticProp]() { }
}