//// [overloadResolution.ts]
class SomeBase {
    private n;

    public s: string;
}
class SomeDerived1 extends SomeBase {
    private m;
}
class SomeDerived2 extends SomeBase {
    private m;
}
class SomeDerived3 extends SomeBase {
    private m;
}


// Ambiguous call picks the first overload in declaration order
function fn1(s: string): string;
function fn1(s: number): number;
function fn1() { return null; }

var s = fn1(undefined);
var s: string;


// No candidate overloads found
fn1({}); // Error

// Generic and non - generic overload where generic overload is the only candidate when called with type arguments
function fn2(s: string, n: number): number;
function fn2<T>(n: number, t: T): T;
function fn2() { return undefined; }

var d = fn2<Date>(0, undefined);
var d: Date;

// Generic and non - generic overload where generic overload is the only candidate when called without type arguments
var s = fn2(0, '');

// Generic and non - generic overload where non - generic overload is the only candidate when called with type arguments
fn2<Date>('', 0); // Error

// Generic and non - generic overload where non - generic overload is the only candidate when called without type arguments
fn2('', 0); // OK

// Generic overloads with differing arity called without type arguments
function fn3<T>(n: T): string;
function fn3<T, U>(s: string, t: T, u: U): U;
function fn3<T, U, V>(v: V, u: U, t: T): number;
function fn3() { return null; }

var s = fn3(3);
var s = fn3('', 3, '');
var n = fn3(5, 5, 5);
var n: number;

// Generic overloads with differing arity called with type arguments matching each overload type parameter count
var s = fn3<number>(4);
var s = fn3<string, string>('', '', '');
var n = fn3<number, string, string>('', '', 3);

// Generic overloads with differing arity called with type argument count that doesn't match any overload
fn3<number, number, number, number>(); // Error

// Generic overloads with constraints called with type arguments that satisfy the constraints
function fn4<T extends string, U extends number>(n: T, m: U);
function fn4<T extends number, U extends string>(n: T, m: U);
function fn4() { }
fn4<string, number>('', 3);
fn4<string, number>(3, ''); // Error
fn4<number, string>('', 3); // Error
fn4<number, string>(3, ''); 

// Generic overloads with constraints called without type arguments but with types that satisfy the constraints
fn4('', 3);
fn4(3, '');
fn4(3, undefined);
fn4('', null);

// Generic overloads with constraints called with type arguments that do not satisfy the constraints
fn4<boolean, Date>(null, null); // Error

// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
fn4(true, null); // Error
fn4(null, true); // Error

// Non - generic overloads where contextual typing of function arguments has errors
function fn5(f: (n: string) => void): string;
function fn5(f: (n: number) => void): number;
function fn5() { return undefined; }
var n = fn5((n) => n.toFixed());
var s = fn5((n) => n.substr(0));



//// [overloadResolution.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SomeBase = /** @class */ (function () {
    function SomeBase() {
    }
    return SomeBase;
}());
var SomeDerived1 = /** @class */ (function (_super) {
    __extends(SomeDerived1, _super);
    function SomeDerived1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SomeDerived1;
}(SomeBase));
var SomeDerived2 = /** @class */ (function (_super) {
    __extends(SomeDerived2, _super);
    function SomeDerived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SomeDerived2;
}(SomeBase));
var SomeDerived3 = /** @class */ (function (_super) {
    __extends(SomeDerived3, _super);
    function SomeDerived3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SomeDerived3;
}(SomeBase));
function fn1() { return null; }
var s = fn1(undefined);
var s;
// No candidate overloads found
fn1({}); // Error
function fn2() { return undefined; }
var d = fn2(0, undefined);
var d;
// Generic and non - generic overload where generic overload is the only candidate when called without type arguments
var s = fn2(0, '');
// Generic and non - generic overload where non - generic overload is the only candidate when called with type arguments
fn2('', 0); // Error
// Generic and non - generic overload where non - generic overload is the only candidate when called without type arguments
fn2('', 0); // OK
function fn3() { return null; }
var s = fn3(3);
var s = fn3('', 3, '');
var n = fn3(5, 5, 5);
var n;
// Generic overloads with differing arity called with type arguments matching each overload type parameter count
var s = fn3(4);
var s = fn3('', '', '');
var n = fn3('', '', 3);
// Generic overloads with differing arity called with type argument count that doesn't match any overload
fn3(); // Error
function fn4() { }
fn4('', 3);
fn4(3, ''); // Error
fn4('', 3); // Error
fn4(3, '');
// Generic overloads with constraints called without type arguments but with types that satisfy the constraints
fn4('', 3);
fn4(3, '');
fn4(3, undefined);
fn4('', null);
// Generic overloads with constraints called with type arguments that do not satisfy the constraints
fn4(null, null); // Error
// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
fn4(true, null); // Error
fn4(null, true); // Error
function fn5() { return undefined; }
var n = fn5(function (n) { return n.toFixed(); });
var s = fn5(function (n) { return n.substr(0); });
