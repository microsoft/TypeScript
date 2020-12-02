//// [instancePropertyInClassType.ts]
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

    var c = new C(1, 2);
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = c.y(); // error

}

module Generic {
    class C<T,U> {
        x: T;
        get y() {
            return null;
        }
        set y(v: U) { }
        fn() { return this; }
        constructor(public a: T, private b: U) { }
    }

    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = c.y(); // error
}

//// [instancePropertyInClassType.js]
var NonGeneric;
(function (NonGeneric) {
    var C = /** @class */ (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        var proto_1 = C.prototype;
        Object.defineProperty(proto_1, "y", {
            get: function () {
                return 1;
            },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        proto_1.fn = function () { return this; };
        return C;
    }());
    var c = new C(1, 2);
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = c.y(); // error
})(NonGeneric || (NonGeneric = {}));
var Generic;
(function (Generic) {
    var C = /** @class */ (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        var proto_2 = C.prototype;
        Object.defineProperty(proto_2, "y", {
            get: function () {
                return null;
            },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        proto_2.fn = function () { return this; };
        return C;
    }());
    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = c.y(); // error
})(Generic || (Generic = {}));
