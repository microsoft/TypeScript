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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var NonGeneric;
(function (NonGeneric) {
    var C = (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        Object.defineProperty(C.prototype, "y", {
            get: function () {
                return 1;
            },
            set: function (v) { },
            enumerable: true,
            configurable: true
        });
        C.prototype.fn = function () { return this; };
        __names(C.prototype, ["fn"]);
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
    var C = (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        Object.defineProperty(C.prototype, "y", {
            get: function () {
                return null;
            },
            set: function (v) { },
            enumerable: true,
            configurable: true
        });
        C.prototype.fn = function () { return this; };
        __names(C.prototype, ["fn"]);
        return C;
    }());
    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = c.y(); // error
})(Generic || (Generic = {}));
