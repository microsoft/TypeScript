//// [classMemberWithMissingIdentifier.ts]
class C { 
    public {};
}

//// [classMemberWithMissingIdentifier.js]
var C = (function () {
    function C() {
        this. = {};
    }
    return C;
}());
