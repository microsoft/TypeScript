//// [instancePropertiesInheritedIntoClassType.ts]
module NonGeneric {
    class C {
        x: string;
        get y() {
            return 1;
        }
        set y(v) { }
        fn() { return this; }
        constructor(public a: number, private b: number) { }
    }

    class D extends C { e: string; }

    var d = new D(1, 2);
    var r = d.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = d.y(); // error

}

module Generic {
    class C<T, U> {
        x: T;
        get y() {
            return null;
        }
        set y(v: U) { }
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    class D<T, U> extends C<T, U> { e: T; }

    var d = new D(1, '');
    var r = d.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = d.y(); // error
}

//// [instancePropertiesInheritedIntoClassType.js]
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
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        Object.defineProperty(C.prototype, "y", {
            get: function () {
                return 1;
            },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        C.prototype.fn = function () { return this; };
        return C;
    }());
    var D = /** @class */ (function (_super) {
        __extends(D, _super);
        function D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D;
    }(C));
    var d = new D(1, 2);
    var r = d.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = d.y(); // error
})(NonGeneric || (NonGeneric = {}));
var Generic;
(function (Generic) {
    var C = /** @class */ (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        Object.defineProperty(C.prototype, "y", {
            get: function () {
                return null;
            },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        C.prototype.fn = function () { return this; };
        return C;
    }());
    var D = /** @class */ (function (_super) {
        __extends(D, _super);
        function D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return D;
    }(C));
    var d = new D(1, '');
    var r = d.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = d.y(); // error
})(Generic || (Generic = {}));
