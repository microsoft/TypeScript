//// [callOnClass.ts]
class C { }
var c = C();
 


//// [callOnClass.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c = C();
