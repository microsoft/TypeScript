//// [everyTypeWithInitializer.ts]
interface I {
    id: number;
}

class C implements I {
    id: number;
}

class D<T>{
    source: T;
    recurse: D<T>;
    wrapped: D<D<T>>
}

function F(x: string): number { return 42; }

module M {
    export class A {
        name: string;
    }

    export function F2(x: number): string { return x.toString(); }
}

var aNumber = 9.9;
var aString = 'this is a string';
var aDate = new Date(12);
var anObject = new Object();

var anAny = null;
var anOtherAny = <any> new C();
var anUndefined = undefined;


var aClass = new C();
var aGenericClass = new D<string>();
var anObjectLiteral = { id: 12 };

var aFunction = F;
var aLambda = (x) => 2;

var aModule = M;
var aClassInModule = new M.A();
var aFunctionInModule = M.F2;

// no initializer or annotation, so this is an 'any'
var x;



//// [everyTypeWithInitializer.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());
function F(x) { return 42; }
var M;
(function (M) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    M.A = A;
    function F2(x) { return x.toString(); }
    M.F2 = F2;
})(M || (M = {}));
var aNumber = 9.9;
var aString = 'this is a string';
var aDate = new Date(12);
var anObject = new Object();
var anAny = null;
var anOtherAny = new C();
var anUndefined = undefined;
var aClass = new C();
var aGenericClass = new D();
var anObjectLiteral = { id: 12 };
var aFunction = F;
var aLambda = function (x) { return 2; };
var aModule = M;
var aClassInModule = new M.A();
var aFunctionInModule = M.F2;
// no initializer or annotation, so this is an 'any'
var x;
