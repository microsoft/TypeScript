//// [everyTypeWithAnnotationAndInvalidInitializer.ts]
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
function F2(x: number): boolean { return x < 42; }

module M {
    export class A {
        name: string;
    }

    export function F2(x: number): string { return x.toString(); }
}

module N {
    export class A {
        id: number;
    }

    export function F2(x: number): string { return x.toString(); }
}

var aNumber: number = 'this is a string';
var aString: string = 9.9;
var aDate: Date = 9.9;

var aVoid: void = 9.9;

var anInterface: I = new D();
var aClass: C = new D();
var aGenericClass: D<string> = new C();
var anObjectLiteral: I = { id: 'a string' };
var anOtherObjectLiteral: { id: string } = new C();

var aFunction: typeof F = F2;
var anOtherFunction: (x: string) => number = F2;
var aLambda: typeof F = (x) => 'a string';

var aModule: typeof M = N;
var aClassInModule: M.A = new N.A();
var aFunctionInModule: typeof M.F2 = F2;



//// [everyTypeWithAnnotationAndInvalidInitializer.js]
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
function F2(x) { return x < 42; }
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
var N;
(function (N) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    N.A = A;
    function F2(x) { return x.toString(); }
    N.F2 = F2;
})(N || (N = {}));
var aNumber = 'this is a string';
var aString = 9.9;
var aDate = 9.9;
var aVoid = 9.9;
var anInterface = new D();
var aClass = new D();
var aGenericClass = new C();
var anObjectLiteral = { id: 'a string' };
var anOtherObjectLiteral = new C();
var aFunction = F2;
var anOtherFunction = F2;
var aLambda = function (x) { return 'a string'; };
var aModule = N;
var aClassInModule = new N.A();
var aFunctionInModule = F2;
