//// [staticPropertyNotInClassType.js]
var NonGeneric;
(function (NonGeneric) {
    var C = (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        C.prototype.fn = function () {
            return this;
        };
        Object.defineProperty(C, "x", {
            get: function () {
                return 1;
            },
            set: function (v) {
            },
            enumerable: true,
            configurable: true
        });
        return C;
    })();

    var C;
    (function (C) {
        C.bar = '';
    })(C || (C = {}));

    var c = new C(1, 2);
    var r = c.fn();
    var r4 = c.foo;
    var r5 = c.bar;
    var r6 = c.x;
})(NonGeneric || (NonGeneric = {}));

var Generic;
(function (Generic) {
    var C = (function () {
        function C(a, b) {
            this.a = a;
            this.b = b;
        }
        C.prototype.fn = function () {
            return this;
        };
        Object.defineProperty(C, "x", {
            get: function () {
                return 1;
            },
            set: function (v) {
            },
            enumerable: true,
            configurable: true
        });
        return C;
    })();

    var C;
    (function (C) {
        C.bar = '';
    })(C || (C = {}));

    var c = new C(1, '');
    var r = c.fn();
    var r4 = c.foo;
    var r5 = c.bar;
    var r6 = c.x;
})(Generic || (Generic = {}));
