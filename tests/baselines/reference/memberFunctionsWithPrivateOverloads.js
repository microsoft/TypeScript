//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/memberFunctionsWithPrivateOverloads.ts] ////

//// [memberFunctionsWithPrivateOverloads.ts]
class C {
    private foo(x: number);
    private foo(x: number, y: string);
    private foo(x: any, y?: any) { }

    private bar(x: 'hi');
    private bar(x: string);
    private bar(x: number, y: string);
    private bar(x: any, y?: any) { }

    private static foo(x: number);
    private static foo(x: number, y: string);
    private static foo(x: any, y?: any) { }

    private static bar(x: 'hi');
    private static bar(x: string);
    private static bar(x: number, y: string);
    private static bar(x: any, y?: any) { }
}

class D<T> {
    private foo(x: number);
    private foo(x: T, y: T);
    private foo(x: any, y?: any) { }

    private bar(x: 'hi');
    private bar(x: string);
    private bar(x: T, y: T);
    private bar(x: any, y?: any) { }

    private static foo(x: number);
    private static foo(x: number, y: number);
    private static foo(x: any, y?: any) { }

    private static bar(x: 'hi');
    private static bar(x: string);
    private static bar(x: number, y: number);
    private static bar(x: any, y?: any) { }

}

var c: C;
var r = c.foo(1); // error

var d: D<number>;
var r2 = d.foo(2); // error

var r3 = C.foo(1); // error
var r4 = D.bar(''); // error

//// [memberFunctionsWithPrivateOverloads.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x, y) { };
    C.prototype.bar = function (x, y) { };
    C.foo = function (x, y) { };
    C.bar = function (x, y) { };
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.foo = function (x, y) { };
    D.prototype.bar = function (x, y) { };
    D.foo = function (x, y) { };
    D.bar = function (x, y) { };
    return D;
}());
var c;
var r = c.foo(1); // error
var d;
var r2 = d.foo(2); // error
var r3 = C.foo(1); // error
var r4 = D.bar(''); // error
