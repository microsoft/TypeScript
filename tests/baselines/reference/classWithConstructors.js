//// [tests/cases/conformance/classes/members/constructorFunctionTypes/classWithConstructors.ts] ////

//// [classWithConstructors.ts]
module NonGeneric {
    class C {
        constructor(x: string) { }
    }

    var c = new C(); // error
    var c2 = new C(''); // ok

    class C2 {
        constructor(x: number);
        constructor(x: string);
        constructor(x: any) { }
    }

    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1); // ok

    class D extends C2 { }

    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
}

module Generics {
    class C<T> {
        constructor(x: T) { }
    }

    var c = new C(); // error
    var c2 = new C(''); // ok

    class C2<T,U> {
        constructor(x: T);
        constructor(x: T, y: U);
        constructor(x: any) { }
    }

    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1, 2); // ok

    class D<T, U> extends C2<T, U> { }

    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
}

//// [classWithConstructors.js]
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
var NonGeneric;
(function (NonGeneric) {
    var C = /** @class */ (function () {
        function C(x) {
        }
        return C;
    }());
    var c = new C(); // error
    var c2 = new C(''); // ok
    var C2 = /** @class */ (function () {
        function C2(x) {
        }
        return C2;
    }());
    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1); // ok
    var D = /** @class */ (function (_super) {
        __extends(D, _super);
        function D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D;
    }(C2));
    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
})(NonGeneric || (NonGeneric = {}));
var Generics;
(function (Generics) {
    var C = /** @class */ (function () {
        function C(x) {
        }
        return C;
    }());
    var c = new C(); // error
    var c2 = new C(''); // ok
    var C2 = /** @class */ (function () {
        function C2(x) {
        }
        return C2;
    }());
    var c3 = new C2(); // error
    var c4 = new C2(''); // ok
    var c5 = new C2(1, 2); // ok
    var D = /** @class */ (function (_super) {
        __extends(D, _super);
        function D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D;
    }(C2));
    var d = new D(); // error
    var d2 = new D(1); // ok
    var d3 = new D(''); // ok
})(Generics || (Generics = {}));
