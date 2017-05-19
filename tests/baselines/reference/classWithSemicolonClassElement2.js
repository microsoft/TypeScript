//// [classWithSemicolonClassElement2.ts]
class C {
    ;
    ;
}

//// [classWithSemicolonClassElement2.js]
var C = (function () {
    function C() {
    }
    ;
    ;
    return C;
}());
