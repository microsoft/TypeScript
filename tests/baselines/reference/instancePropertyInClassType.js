//// [instancePropertyInClassType.js]
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
            set: function (v) {
            },
            enumerable: true,
            configurable: true
        });
        C.prototype.fn = function () {
            return this;
        };
        return C;
    })();

    var c = new C(1, 2);
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = 4;
    var r6 = c.y();
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
            set: function (v) {
            },
            enumerable: true,
            configurable: true
        });
        C.prototype.fn = function () {
            return this;
        };
        return C;
    })();

    var c = new C(1, '');
    var r = c.fn();
    var r2 = r.x;
    var r3 = r.y;
    r.y = '';
    var r6 = c.y();
})(Generic || (Generic = {}));
