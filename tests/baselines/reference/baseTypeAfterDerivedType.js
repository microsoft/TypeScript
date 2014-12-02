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
    Derived2.prototype.method = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a - 0] = arguments[_a];
        }
    };
    return Derived2;
})();
