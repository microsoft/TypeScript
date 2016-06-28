//// [callOnClass.ts]
class C { }
var c = C();
 


//// [callOnClass.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var c = C();
