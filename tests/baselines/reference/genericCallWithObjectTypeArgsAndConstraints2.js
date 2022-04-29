//// [genericCallWithObjectTypeArgsAndConstraints2.ts]
// Generic call with constraints infering type parameter from object member properties
// No errors expected

class Base {
    x: string;
}
class Derived extends Base {
    y: string;
}

function f<T extends Base>(x: { foo: T; bar: T }) {
    var r: T;
    return r;
}
var r = f({ foo: new Base(), bar: new Derived() });
var r2 = f({ foo: new Derived(), bar: new Derived() });


interface I<T> {
    a: T;
}
function f2<T extends Base>(x: I<T>) {
    var r: T;
    return r;
}
var i: I<Derived>;
var r3 = f2(i);


function f3<T extends Base>(x: T, y: (a: T) => T) {
    return y(null);
}
var r4 = f3(new Base(), x => x);
var r5 = f3(new Derived(), x => x);

var r6 = f3(null, null); // any
var r7 = f3(null, x => x); // any


//// [genericCallWithObjectTypeArgsAndConstraints2.js]
// Generic call with constraints infering type parameter from object member properties
// No errors expected
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
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
function f(x) {
    var r;
    return r;
}
var r = f({ foo: new Base(), bar: new Derived() });
var r2 = f({ foo: new Derived(), bar: new Derived() });
function f2(x) {
    var r;
    return r;
}
var i;
var r3 = f2(i);
function f3(x, y) {
    return y(null);
}
var r4 = f3(new Base(), function (x) { return x; });
var r5 = f3(new Derived(), function (x) { return x; });
var r6 = f3(null, null); // any
var r7 = f3(null, function (x) { return x; }); // any
