//// [staticPropertyNotInClassType.ts]
module NonGeneric {
    class C {
        fn() { return this; }
        static get x() { return 1; }
        static set x(v) { }
        constructor(public a: number, private b: number) { }
        static foo: string; // not reflected in class type
    }

    module C {
        export var bar = ''; // not reflected in class type
    }

    var c = new C(1, 2);
    var r = c.fn();
    var r4 = c.foo; // error
    var r5 = c.bar; // error
    var r6 = c.x; // error
}

module Generic {
    class C<T, U> {
        fn() { return this; }
        static get x() { return 1; }
        static set x(v) { }
        constructor(public a: T, private b: U) { }
        static foo: T; // not reflected in class type
    }

    module C {
        export var bar = ''; // not reflected in class type
    }

    var c = new C(1, '');
    var r = c.fn();
    var r4 = c.foo; // error
    var r5 = c.bar; // error
    var r6 = c.x; // error
}

//// [staticPropertyNotInClassType.js]
var NonGeneric;
(function (NonGeneric) {
    var C = /** @class */ (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        C.prototype.fn = function () { return this; };
        Object.defineProperty(C, "x", {
            get: function () { return 1; },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        return C;
    }());
    (function (C) {
        C.bar = ''; // not reflected in class type
    })(C || (C = {}));
    var c = new C(1, 2);
    var r = c.fn();
    var r4 = c.foo; // error
    var r5 = c.bar; // error
    var r6 = c.x; // error
})(NonGeneric || (NonGeneric = {}));
var Generic;
(function (Generic) {
    var C = /** @class */ (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        C.prototype.fn = function () { return this; };
        Object.defineProperty(C, "x", {
            get: function () { return 1; },
            set: function (v) { },
            enumerable: false,
            configurable: true
        });
        return C;
    }());
    (function (C) {
        C.bar = ''; // not reflected in class type
    })(C || (C = {}));
    var c = new C(1, '');
    var r = c.fn();
    var r4 = c.foo; // error
    var r5 = c.bar; // error
    var r6 = c.x; // error
})(Generic || (Generic = {}));
