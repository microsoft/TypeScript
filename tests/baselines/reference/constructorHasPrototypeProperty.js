//// [constructorHasPrototypeProperty.ts]
module NonGeneric {
    class C {
        foo: string;
    }

    class D extends C {
        bar: string;
    }

    var r = C.prototype;
    r.foo;
    var r2 = D.prototype;
    r2.bar;
}

module Generic {
    class C<T,U> {
        foo: T;
        bar: U;
    }

    class D<T,U> extends C<T,U> {
        baz: T;
        bing: U;
    }

    var r = C.prototype; // C<any, any>
    var ra = r.foo; // any
    var r2 = D.prototype; // D<any, any>
    var rb = r2.baz; // any
}

//// [constructorHasPrototypeProperty.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NonGeneric;
(function (NonGeneric) {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    }(C));
    var r = C.prototype;
    r.foo;
    var r2 = D.prototype;
    r2.bar;
})(NonGeneric || (NonGeneric = {}));
var Generic;
(function (Generic) {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    }(C));
    var r = C.prototype; // C<any, any>
    var ra = r.foo; // any
    var r2 = D.prototype; // D<any, any>
    var rb = r2.baz; // any
})(Generic || (Generic = {}));
