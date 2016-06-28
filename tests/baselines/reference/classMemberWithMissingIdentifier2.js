//// [classMemberWithMissingIdentifier2.ts]
class C { 
    public {[name:string]:VariableDeclaration};
}

//// [classMemberWithMissingIdentifier2.js]
var C = (function () {
    function C() {
        this. = (_a = {}, _a[name] = string, _a.VariableDeclaration = VariableDeclaration, _a);
        var _a;
    }
    return C;
}());
