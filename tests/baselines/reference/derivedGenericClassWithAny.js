//// [derivedGenericClassWithAny.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "X", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    C.prototype.foo = function () {
        return null;
    };
    return C;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(D.prototype, "X", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    D.prototype.foo = function () {
        return 1;
    };

    Object.defineProperty(D, "Y", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    D.bar = function () {
        return null;
    };
    return D;
})(C);

// if D is a valid class definition than E is now not safe tranisitively through C
var E = (function (_super) {
    __extends(E, _super);
    function E() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(E.prototype, "X", {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    E.prototype.foo = function () {
        return '';
    };
    return E;
})(D);

var c;
var d;
var e;

c = d;
c = e;
var r = c.foo(); // e.foo would return string
