//// [subtypingWithObjectMembers.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.apply(this, arguments);
    }
    return Derived;
})(Base);
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
})(Derived);

// N and M have the same name, same accessibility, same optionality, and N is a subtype of M
// foo properties are valid, bar properties cause errors in the derived class declarations
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

var A2 = (function () {
    function A2() {
    }
    return A2;
})();

var B2 = (function (_super) {
    __extends(B2, _super);
    function B2() {
        _super.apply(this, arguments);
    }
    return B2;
})(A2);

var A3 = (function () {
    function A3() {
    }
    return A3;
})();

var B3 = (function (_super) {
    __extends(B3, _super);
    function B3() {
        _super.apply(this, arguments);
    }
    return B3;
})(A3);

var TwoLevels;
(function (TwoLevels) {
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

    var A2 = (function () {
        function A2() {
        }
        return A2;
    })();

    var B2 = (function (_super) {
        __extends(B2, _super);
        function B2() {
            _super.apply(this, arguments);
        }
        return B2;
    })(A2);

    var A3 = (function () {
        function A3() {
        }
        return A3;
    })();

    var B3 = (function (_super) {
        __extends(B3, _super);
        function B3() {
            _super.apply(this, arguments);
        }
        return B3;
    })(A3);
})(TwoLevels || (TwoLevels = {}));
