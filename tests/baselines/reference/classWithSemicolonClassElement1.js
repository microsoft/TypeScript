//// [classWithSemicolonClassElement1.ts]
class C {
    ;
}

//// [classWithSemicolonClassElement1.js]
var C = (function () {
    function C() {
    }
    ;
    return C;
}());
