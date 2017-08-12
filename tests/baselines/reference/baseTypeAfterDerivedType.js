//// [baseTypeAfterDerivedType.ts]
interface Derived extends Base {
    method(...args: any[]): void;
}

interface Base {
    method(...args: any[]): void;
}

class Derived2 implements Base2 {
    method(...args: any[]): void { }
}

interface Base2 {
    method(...args: any[]): void;
}


//// [baseTypeAfterDerivedType.js]
var Derived2 = (function () {
    function Derived2() {
    }
    var proto_1 = Derived2.prototype;
    proto_1.method = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return Derived2;
}());
