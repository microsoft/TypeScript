//// [genericSetterInClassType.ts]
module NonGeneric {
    class C {
        get y() {
            return 1;
        }
        set y(v) { }
    }

    var c = new C();
    c.y = c.y;
}

module Generic {
    class C<T> {
        get y(): T {
            return 1 as never;
        }
        set y(v) { }
    }

    var c = new C<number>();
    c.y = c.y;
}

//// [genericSetterInClassType.js]
var NonGeneric;
(function (NonGeneric) {
    var C = /** @class */ (function () {
        function C() {
        }
        Object.defineProperty(C.prototype, "y", {
            get: function () {
                return 1;
            },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        return C;
    }());
    var c = new C();
    c.y = c.y;
})(NonGeneric || (NonGeneric = {}));
var Generic;
(function (Generic) {
    var C = /** @class */ (function () {
        function C() {
        }
        Object.defineProperty(C.prototype, "y", {
            get: function () {
                return 1;
            },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        return C;
    }());
    var c = new C();
    c.y = c.y;
})(Generic || (Generic = {}));
