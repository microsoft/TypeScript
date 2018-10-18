//// [everyTypeWithAnnotationAndInitializer.ts]
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

var aNumber: number = 9.9;
var aString: string = 'this is a string';
var aDate: Date = new Date(12);
var anObject: Object = new Object();

var anAny: any = null;
var aSecondAny: any = undefined;
var aVoid: void = undefined;

var anInterface: I = new C();
var aClass: C = new C();
var aGenericClass: D<string> = new D<string>();
var anObjectLiteral: I = { id: 12 };
var anOtherObjectLiteral: { id: number } = new C();

var aFunction: typeof F = F;
var anOtherFunction: (x: string) => number = F;
var aLambda: typeof F = (x) => 2;

var aModule: typeof M = M;
var aClassInModule: M.A = new M.A();
var aFunctionInModule: typeof M.F2 = (x) => 'this is a string';



//// [everyTypeWithAnnotationAndInitializer.js]
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
var aSecondAny = undefined;
var aVoid = undefined;
var anInterface = new C();
var aClass = new C();
var aGenericClass = new D();
var anObjectLiteral = { id: 12 };
var anOtherObjectLiteral = new C();
var aFunction = F;
var anOtherFunction = F;
var aLambda = function (x) { return 2; };
var aModule = M;
var aClassInModule = new M.A();
var aFunctionInModule = function (x) { return 'this is a string'; };
