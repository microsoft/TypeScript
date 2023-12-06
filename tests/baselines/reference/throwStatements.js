//// [tests/cases/conformance/statements/throwStatements/throwStatements.ts] ////

//// [throwStatements.ts]
// all legal

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
throw aNumber;
var aString = 'this is a string';
throw aString;
var aDate = new Date(12);
throw aDate;
var anObject = new Object();
throw anObject;

var anAny = null;
throw anAny;
var anOtherAny = <any> new C();
throw anOtherAny;
var anUndefined = undefined;
throw anUndefined;

var aClass = new C();
throw aClass;
var aGenericClass = new D<string>();
throw aGenericClass;
var anObjectLiteral = { id: 12 };
throw anObjectLiteral;

var aFunction = F;
throw aFunction;
throw aFunction('');
var aLambda = (x) => 2;
throw aLambda;
throw aLambda(1);

var aModule = M;
throw aModule;
throw typeof M;
var aClassInModule = new M.A();
throw aClassInModule;
var aFunctionInModule = M.F2;
throw aFunctionInModule;

// no initializer or annotation, so this is an 'any'
var x;
throw x;

// literals
throw 0.0;
throw false;
throw null;
throw undefined;
throw 'a string';
throw function () { return 'a string' };
throw <T>(x:T) => 42;
throw { x: 12, y: 13 };
throw [];
throw ['a', ['b']];
throw /[a-z]/;
throw new Date();
throw new C();
throw new Object();
throw new D<number>();


//// [throwStatements.js]
// all legal
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
throw aNumber;
var aString = 'this is a string';
throw aString;
var aDate = new Date(12);
throw aDate;
var anObject = new Object();
throw anObject;
var anAny = null;
throw anAny;
var anOtherAny = new C();
throw anOtherAny;
var anUndefined = undefined;
throw anUndefined;
var aClass = new C();
throw aClass;
var aGenericClass = new D();
throw aGenericClass;
var anObjectLiteral = { id: 12 };
throw anObjectLiteral;
var aFunction = F;
throw aFunction;
throw aFunction('');
var aLambda = function (x) { return 2; };
throw aLambda;
throw aLambda(1);
var aModule = M;
throw aModule;
throw typeof M;
var aClassInModule = new M.A();
throw aClassInModule;
var aFunctionInModule = M.F2;
throw aFunctionInModule;
// no initializer or annotation, so this is an 'any'
var x;
throw x;
// literals
throw 0.0;
throw false;
throw null;
throw undefined;
throw 'a string';
throw function () { return 'a string'; };
throw function (x) { return 42; };
throw { x: 12, y: 13 };
throw [];
throw ['a', ['b']];
throw /[a-z]/;
throw new Date();
throw new C();
throw new Object();
throw new D();
