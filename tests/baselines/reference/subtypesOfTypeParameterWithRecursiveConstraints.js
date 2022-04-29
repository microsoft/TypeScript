//// [subtypesOfTypeParameterWithRecursiveConstraints.ts]
// checking whether other types are subtypes of type parameters with constraints

class Foo<T> { foo: T; }
function f<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>>(t: T, u: U, v: V) {
    // ok
    var r1 = true ? t : u;
    var r1 = true ? u : t;

    // ok
    var r2 = true ? t : v;
    var r2 = true ? v : t;

    // ok
    var r3 = true ? v : u;
    var r3 = true ? u : v;

    // ok
    var r4 = true ? t : new Foo<T>();
    var r4 = true ? new Foo<T>() : t;

    // ok
    var r5 = true ? u : new Foo<T>();
    var r5 = true ? new Foo<T>() : u;

    // ok
    var r6 = true ? v : new Foo<T>();
    var r6 = true ? new Foo<T>() : v;


    // ok
    var r7 = true ? t : new Foo<U>();
    var r7 = true ? new Foo<U>() : t;

    // ok
    var r8 = true ? u : new Foo<U>();
    var r8 = true ? new Foo<U>() : u;

    // ok
    var r9 = true ? v : new Foo<U>();
    var r9 = true ? new Foo<U>() : v;


    // ok
    var r10 = true ? t : new Foo<V>();
    var r10 = true ? new Foo<V>() : t;

    // ok
    var r11 = true ? u : new Foo<V>();
    var r11 = true ? new Foo<V>() : u;

    // ok
    var r12 = true ? v : new Foo<V>();
    var r12 = true ? new Foo<V>() : v;
}

module M1 {
    class Base<T> {
        foo: T;
    }

    class D1<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<T> {
        [x: string]: T;
        foo: T
    }

    class D2<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<T> {
        [x: string]: T;
        foo: U
    }

    class D3<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<T> {
        [x: string]: T;
        foo: V
    }

    class D4<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<U> {
        [x: string]: U;
        foo: T
    }

    class D5<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<U> {
        [x: string]: U;
        foo: U
    }

    class D6<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<U> {
        [x: string]: U;
        foo: V
    }

    class D7<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<V> {
        [x: string]: V;
        foo: T
    }

    class D8<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<V> {
        [x: string]: V;
        foo: U
    }

    class D9<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base<V> {
        [x: string]: V;
        foo: V
    }
}


module M2 {
    class Base2<T> {
        foo: Foo<T>;
    }

    class D1<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<T> {
        [x: string]: T;
        foo: T
    }

    class D2<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<T> {
        [x: string]: T;
        foo: U
    }

    class D3<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<T> {
        [x: string]: T;
        foo: V
    }

    class D4<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<U> {
        [x: string]: U;
        foo: T
    }

    class D5<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<U> {
        [x: string]: U;
        foo: U
    }

    class D6<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<U> {
        [x: string]: U;
        foo: V
    }

    class D7<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<V> {
        [x: string]: V;
        foo: T
    }

    class D8<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<V> {
        [x: string]: V;
        foo: U
    }

    class D9<T extends Foo<U>, U extends Foo<T>, V extends Foo<V>> extends Base2<V> {
        [x: string]: V;
        foo: V
    }
}

//// [subtypesOfTypeParameterWithRecursiveConstraints.js]
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
    var r1 = true ? t : u;
    var r1 = true ? u : t;
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
    // ok
    var r7 = true ? t : new Foo();
    var r7 = true ? new Foo() : t;
    // ok
    var r8 = true ? u : new Foo();
    var r8 = true ? new Foo() : u;
    // ok
    var r9 = true ? v : new Foo();
    var r9 = true ? new Foo() : v;
    // ok
    var r10 = true ? t : new Foo();
    var r10 = true ? new Foo() : t;
    // ok
    var r11 = true ? u : new Foo();
    var r11 = true ? new Foo() : u;
    // ok
    var r12 = true ? v : new Foo();
    var r12 = true ? new Foo() : v;
}
var M1;
(function (M1) {
    var Base = /** @class */ (function () {
        function Base() {
        }
        return Base;
    }());
    var D1 = /** @class */ (function (_super) {
        __extends(D1, _super);
        function D1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D1;
    }(Base));
    var D2 = /** @class */ (function (_super) {
        __extends(D2, _super);
        function D2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D2;
    }(Base));
    var D3 = /** @class */ (function (_super) {
        __extends(D3, _super);
        function D3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D3;
    }(Base));
    var D4 = /** @class */ (function (_super) {
        __extends(D4, _super);
        function D4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D4;
    }(Base));
    var D5 = /** @class */ (function (_super) {
        __extends(D5, _super);
        function D5() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D5;
    }(Base));
    var D6 = /** @class */ (function (_super) {
        __extends(D6, _super);
        function D6() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D6;
    }(Base));
    var D7 = /** @class */ (function (_super) {
        __extends(D7, _super);
        function D7() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D7;
    }(Base));
    var D8 = /** @class */ (function (_super) {
        __extends(D8, _super);
        function D8() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D8;
    }(Base));
    var D9 = /** @class */ (function (_super) {
        __extends(D9, _super);
        function D9() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D9;
    }(Base));
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    var Base2 = /** @class */ (function () {
        function Base2() {
        }
        return Base2;
    }());
    var D1 = /** @class */ (function (_super) {
        __extends(D1, _super);
        function D1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D1;
    }(Base2));
    var D2 = /** @class */ (function (_super) {
        __extends(D2, _super);
        function D2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D2;
    }(Base2));
    var D3 = /** @class */ (function (_super) {
        __extends(D3, _super);
        function D3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D3;
    }(Base2));
    var D4 = /** @class */ (function (_super) {
        __extends(D4, _super);
        function D4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D4;
    }(Base2));
    var D5 = /** @class */ (function (_super) {
        __extends(D5, _super);
        function D5() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D5;
    }(Base2));
    var D6 = /** @class */ (function (_super) {
        __extends(D6, _super);
        function D6() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D6;
    }(Base2));
    var D7 = /** @class */ (function (_super) {
        __extends(D7, _super);
        function D7() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D7;
    }(Base2));
    var D8 = /** @class */ (function (_super) {
        __extends(D8, _super);
        function D8() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D8;
    }(Base2));
    var D9 = /** @class */ (function (_super) {
        __extends(D9, _super);
        function D9() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D9;
    }(Base2));
})(M2 || (M2 = {}));
