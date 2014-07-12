//// [inheritance.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var B1 = (function () {
    function B1() {
    }
    return B1;
})();

var B2 = (function () {
    function B2() {
    }
    return B2;
})();

var D1 = (function (_super) {
    __extends(D1, _super);
    function D1() {
        _super.apply(this, arguments);
    }
    return D1;
})(B1);

var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
})(B2);

var N = (function () {
    function N() {
    }
    return N;
})();

var ND = (function (_super) {
    __extends(ND, _super);
    function ND() {
        _super.apply(this, arguments);
    }
    return ND;
})(N);

var Good = (function () {
    function Good() {
        this.f = function () {
            return 0;
        };
    }
    Good.prototype.g = function () {
        return 0;
    };
    return Good;
})();

var Baad = (function (_super) {
    __extends(Baad, _super);
    function Baad() {
        _super.apply(this, arguments);
    }
    Baad.prototype.f = function () {
        return 0;
    };
    Baad.prototype.g = function (n) {
        return 0;
    };
    return Baad;
})(Good);
