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
        var C_prototype = C.prototype;
        Object.defineProperty(C_prototype, "y", {
            get: function () {
                return 1;
            },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        C_prototype.fn = function () { return this; };
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
        var C_prototype_1 = C.prototype;
        Object.defineProperty(C_prototype_1, "y", {
            get: function () {
                return null;
            },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        C_prototype_1.fn = function () { return this; };
        return C;
    }());
    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = c.y(); // error
})(Generic || (Generic = {}));
