//// [staticPrototypeProperty.ts]
class C {
   static prototype() { }
}
 
class C2 {
   static prototype;
}

//// [staticPrototypeProperty.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype = function () { };
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
