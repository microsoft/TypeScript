//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/memberFunctionsWithPublicOverloads.ts] ////

//// [memberFunctionsWithPublicOverloads.ts]
class C {
    public foo(x: number);
    public foo(x: number, y: string);
    public foo(x: any, y?: any) { }

    public bar(x: 'hi');
    public bar(x: string);
    public bar(x: number, y: string);
    public bar(x: any, y?: any) { }

    public static foo(x: number);
    public static foo(x: number, y: string);
    public static foo(x: any, y?: any) { }

    public static bar(x: 'hi');
    public static bar(x: string);
    public static bar(x: number, y: string);
    public static bar(x: any, y?: any) { }
}

class D<T> {
    public foo(x: number);
    public foo(x: T, y: T);
    public foo(x: any, y?: any) { }

    public bar(x: 'hi');
    public bar(x: string);
    public bar(x: T, y: T);
    public bar(x: any, y?: any) { }

    public static foo(x: number);
    public static foo(x: number, y: string);
    public static foo(x: any, y?: any) { }

    public static bar(x: 'hi');
    public static bar(x: string);
    public static bar(x: number, y: string);
    public static bar(x: any, y?: any) { }

}

//// [memberFunctionsWithPublicOverloads.js]
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
