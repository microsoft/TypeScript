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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Foo = (function () {
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
var B1 = (function () {
    function B1() {
    }
    return B1;
}());
var D1 = (function (_super) {
    __extends(D1, _super);
    function D1() {
        _super.apply(this, arguments);
    }
    return D1;
}(B1));
var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
}(B1));
var D3 = (function (_super) {
    __extends(D3, _super);
    function D3() {
        _super.apply(this, arguments);
    }
    return D3;
}(B1));
var D4 = (function (_super) {
    __extends(D4, _super);
    function D4() {
        _super.apply(this, arguments);
    }
    return D4;
}(B1));
var D5 = (function (_super) {
    __extends(D5, _super);
    function D5() {
        _super.apply(this, arguments);
    }
    return D5;
}(B1));
var D6 = (function (_super) {
    __extends(D6, _super);
    function D6() {
        _super.apply(this, arguments);
    }
    return D6;
}(B1));
var D7 = (function (_super) {
    __extends(D7, _super);
    function D7() {
        _super.apply(this, arguments);
    }
    return D7;
}(B1));
var D8 = (function (_super) {
    __extends(D8, _super);
    function D8() {
        _super.apply(this, arguments);
    }
    return D8;
}(B1));
var D9 = (function (_super) {
    __extends(D9, _super);
    function D9() {
        _super.apply(this, arguments);
    }
    return D9;
}(B1));
