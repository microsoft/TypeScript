//// [classMemberWithMissingIdentifier.ts]
class C { 
    public {};
}

//// [classMemberWithMissingIdentifier.js]
var C = /** @class */ (function () {
    function C() {
        this. = {};
    }
    return C;
}());
