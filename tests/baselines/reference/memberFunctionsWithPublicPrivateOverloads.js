//// [memberFunctionsWithPublicPrivateOverloads.ts]
class C {
    private foo(x: number);
    public foo(x: number, y: string); // error
    private foo(x: any, y?: any) { }

    private bar(x: 'hi');
    public bar(x: string); // error
    private bar(x: number, y: string);
    private bar(x: any, y?: any) { }

    private static foo(x: number);
    public static foo(x: number, y: string); // error
    private static foo(x: any, y?: any) { }

    private static bar(x: 'hi');
    public static bar(x: string); // error
    private static bar(x: number, y: string);
    private static bar(x: any, y?: any) { }
}

class D<T> {
    private foo(x: number); 
    public foo(x: T, y: T); // error
    private foo(x: any, y?: any) { }

    private bar(x: 'hi');
    public bar(x: string); // error
    private bar(x: T, y: T);
    private bar(x: any, y?: any) { }

    private static foo(x: number);
    public static foo(x: number, y: string); // error
    private static foo(x: any, y?: any) { }

    private static bar(x: 'hi');
    public static bar(x: string); // error
    private static bar(x: number, y: string);
    private static bar(x: any, y?: any) { }
}

var c: C;
var r = c.foo(1); // error

var d: D<number>;
var r2 = d.foo(2); // error

//// [memberFunctionsWithPublicPrivateOverloads.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x, y) {
    };
    C.prototype.bar = function (x, y) {
    };
    C.foo = function (x, y) {
    };
    C.bar = function (x, y) {
    };
    return C;
})();
var D = (function () {
    function D() {
    }
    D.prototype.foo = function (x, y) {
    };
    D.prototype.bar = function (x, y) {
    };
    D.foo = function (x, y) {
    };
    D.bar = function (x, y) {
    };
    return D;
})();
var c;
var r = c.foo(1); // error
var d;
var r2 = d.foo(2); // error 
