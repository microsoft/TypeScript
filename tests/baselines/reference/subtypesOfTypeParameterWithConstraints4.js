//// [tests/cases/conformance/types/typeRelationships/subtypesAndSuperTypes/subtypesOfTypeParameterWithConstraints4.ts] ////

//// [subtypesOfTypeParameterWithConstraints4.ts]
// checking whether other types are subtypes of type parameters with constraints

class Foo { foo: number; }
function f<T extends Foo, U extends Foo, V>(t: T, u: U, v: V) {
    // ok
    var r = true ? t : u;
    var r = true ? u : t;

    // ok
    var r2 = true ? t : v;
    var r2 = true ? v : t;

    // ok
    var r3 = true ? v : u;
    var r3 = true ? u : v;

    // ok
    var r4 = true ? t : new Foo();
    var r4 = true ? new Foo() : t;

    // ok
    var r5 = true ? u : new Foo();
    var r5 = true ? new Foo() : u;

    // ok
    var r6 = true ? v : new Foo();
    var r6 = true ? new Foo() : v;

}

class B1<T> {
    foo: T;
}

class D1<T extends Foo, U extends Foo, V> extends B1<Foo> {
    [x: string]: Foo;
    foo: T; // ok
}

class D2<T extends Foo, U extends Foo, V> extends B1<Foo> {
    [x: string]: Foo;
    foo: U; // ok
}

class D3<T extends Foo, U extends Foo, V> extends B1<Foo> {
    [x: string]: Foo;
    foo: V; // error
}

class D4<T extends Foo, U extends Foo, V> extends B1<T> {
    [x: string]: T;
    foo: T; // ok
}

class D5<T extends Foo, U extends Foo, V> extends B1<T> {
    [x: string]: T;
    foo: U; // error
}

class D6<T extends Foo, U extends Foo, V> extends B1<T> {
    [x: string]: T;
    foo: V; // error
}

class D7<T extends Foo, U extends Foo, V> extends B1<U> {
    [x: string]: U;
    foo: T; // error
}

class D8<T extends Foo, U extends Foo, V> extends B1<U> {
    [x: string]: U;
    foo: U; // ok
}

class D9<T extends Foo, U extends Foo, V> extends B1<U> {
    [x: string]: U;
    foo: V; // error
}

//// [subtypesOfTypeParameterWithConstraints4.js]
// checking whether other types are subtypes of type parameters with constraints
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
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
function f(t, u, v) {
    // ok
    var r = true ? t : u;
    var r = true ? u : t;
    // ok
    var r2 = true ? t : v;
    var r2 = true ? v : t;
    // ok
    var r3 = true ? v : u;
    var r3 = true ? u : v;
    // ok
    var r4 = true ? t : new Foo();
    var r4 = true ? new Foo() : t;
    // ok
    var r5 = true ? u : new Foo();
    var r5 = true ? new Foo() : u;
    // ok
    var r6 = true ? v : new Foo();
    var r6 = true ? new Foo() : v;
}
var B1 = /** @class */ (function () {
    function B1() {
    }
    return B1;
}());
var D1 = /** @class */ (function (_super) {
    __extends(D1, _super);
    function D1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D1;
}(B1));
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(B1));
var D3 = /** @class */ (function (_super) {
    __extends(D3, _super);
    function D3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D3;
}(B1));
var D4 = /** @class */ (function (_super) {
    __extends(D4, _super);
    function D4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D4;
}(B1));
var D5 = /** @class */ (function (_super) {
    __extends(D5, _super);
    function D5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D5;
}(B1));
var D6 = /** @class */ (function (_super) {
    __extends(D6, _super);
    function D6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D6;
}(B1));
var D7 = /** @class */ (function (_super) {
    __extends(D7, _super);
    function D7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D7;
}(B1));
var D8 = /** @class */ (function (_super) {
    __extends(D8, _super);
    function D8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D8;
}(B1));
var D9 = /** @class */ (function (_super) {
    __extends(D9, _super);
    function D9() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D9;
}(B1));
