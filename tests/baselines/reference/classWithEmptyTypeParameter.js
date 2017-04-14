//// [classWithEmptyTypeParameter.ts]
class C<> {
}

//// [classWithEmptyTypeParameter.js]
var C = (function () {
    function C() {
    }
    return C;
}());
