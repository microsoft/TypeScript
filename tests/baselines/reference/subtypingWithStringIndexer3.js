//// [subtypingWithStringIndexer3.js]
// Derived type indexer must be subtype of base type indexer
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var A = (function () {
    function A() {
    }
    return A;
})();

var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);

var B2 = (function (_super) {
    __extends(B2, _super);
    function B2() {
        _super.apply(this, arguments);
    }
    return B2;
})(A);

var Generics;
(function (Generics) {
    var A = (function () {
        function A() {
        }
        return A;
    })();

    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(A);

    var B2 = (function (_super) {
        __extends(B2, _super);
        function B2() {
            _super.apply(this, arguments);
        }
        return B2;
    })(A);

    var B3 = (function (_super) {
        __extends(B3, _super);
        function B3() {
            _super.apply(this, arguments);
        }
        return B3;
    })(A);

    var B4 = (function (_super) {
        __extends(B4, _super);
        function B4() {
            _super.apply(this, arguments);
        }
        return B4;
    })(A);

    var B5 = (function (_super) {
        __extends(B5, _super);
        function B5() {
            _super.apply(this, arguments);
        }
        return B5;
    })(A);
})(Generics || (Generics = {}));
