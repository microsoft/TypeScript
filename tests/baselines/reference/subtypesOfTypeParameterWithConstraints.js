//// [subtypesOfTypeParameterWithConstraints.js]
// checking whether other types are subtypes of type parameters with constraints
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C3 = (function () {
    function C3() {
    }
    return C3;
})();

var D1 = (function (_super) {
    __extends(D1, _super);
    function D1() {
        _super.apply(this, arguments);
    }
    return D1;
})(C3);

var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
})(C3);

var D3 = (function (_super) {
    __extends(D3, _super);
    function D3() {
        _super.apply(this, arguments);
    }
    return D3;
})(C3);

var D4 = (function (_super) {
    __extends(D4, _super);
    function D4() {
        _super.apply(this, arguments);
    }
    return D4;
})(C3);

// V > U > T
// test if T is subtype of T, U, V
// should all work
var D5 = (function (_super) {
    __extends(D5, _super);
    function D5() {
        _super.apply(this, arguments);
    }
    return D5;
})(C3);

var D6 = (function (_super) {
    __extends(D6, _super);
    function D6() {
        _super.apply(this, arguments);
    }
    return D6;
})(C3);

var D7 = (function (_super) {
    __extends(D7, _super);
    function D7() {
        _super.apply(this, arguments);
    }
    return D7;
})(C3);

// test if U is a subtype of T, U, V
// only a subtype of V and itself
var D8 = (function (_super) {
    __extends(D8, _super);
    function D8() {
        _super.apply(this, arguments);
    }
    return D8;
})(C3);

var D9 = (function (_super) {
    __extends(D9, _super);
    function D9() {
        _super.apply(this, arguments);
    }
    return D9;
})(C3);

var D10 = (function (_super) {
    __extends(D10, _super);
    function D10() {
        _super.apply(this, arguments);
    }
    return D10;
})(C3);

// test if V is a subtype of T, U, V
// only a subtype of itself
var D11 = (function (_super) {
    __extends(D11, _super);
    function D11() {
        _super.apply(this, arguments);
    }
    return D11;
})(C3);

var D12 = (function (_super) {
    __extends(D12, _super);
    function D12() {
        _super.apply(this, arguments);
    }
    return D12;
})(C3);

var D13 = (function (_super) {
    __extends(D13, _super);
    function D13() {
        _super.apply(this, arguments);
    }
    return D13;
})(C3);

// Date > V > U > T
// test if T is subtype of T, U, V, Date
// should all work
var D14 = (function (_super) {
    __extends(D14, _super);
    function D14() {
        _super.apply(this, arguments);
    }
    return D14;
})(C3);

var D15 = (function (_super) {
    __extends(D15, _super);
    function D15() {
        _super.apply(this, arguments);
    }
    return D15;
})(C3);

var D16 = (function (_super) {
    __extends(D16, _super);
    function D16() {
        _super.apply(this, arguments);
    }
    return D16;
})(C3);

var D17 = (function (_super) {
    __extends(D17, _super);
    function D17() {
        _super.apply(this, arguments);
    }
    return D17;
})(C3);

// test if U is a subtype of T, U, V, Date
// only a subtype of V, Date and itself
var D18 = (function (_super) {
    __extends(D18, _super);
    function D18() {
        _super.apply(this, arguments);
    }
    return D18;
})(C3);

var D19 = (function (_super) {
    __extends(D19, _super);
    function D19() {
        _super.apply(this, arguments);
    }
    return D19;
})(C3);

var D20 = (function (_super) {
    __extends(D20, _super);
    function D20() {
        _super.apply(this, arguments);
    }
    return D20;
})(C3);

var D21 = (function (_super) {
    __extends(D21, _super);
    function D21() {
        _super.apply(this, arguments);
    }
    return D21;
})(C3);

// test if V is a subtype of T, U, V, Date
// only a subtype of itself and Date
var D22 = (function (_super) {
    __extends(D22, _super);
    function D22() {
        _super.apply(this, arguments);
    }
    return D22;
})(C3);

var D23 = (function (_super) {
    __extends(D23, _super);
    function D23() {
        _super.apply(this, arguments);
    }
    return D23;
})(C3);

var D24 = (function (_super) {
    __extends(D24, _super);
    function D24() {
        _super.apply(this, arguments);
    }
    return D24;
})(C3);

var D25 = (function (_super) {
    __extends(D25, _super);
    function D25() {
        _super.apply(this, arguments);
    }
    return D25;
})(C3);

// test if Date is a subtype of T, U, V, Date
// only a subtype of itself
var D26 = (function (_super) {
    __extends(D26, _super);
    function D26() {
        _super.apply(this, arguments);
    }
    return D26;
})(C3);

var D27 = (function (_super) {
    __extends(D27, _super);
    function D27() {
        _super.apply(this, arguments);
    }
    return D27;
})(C3);

var D28 = (function (_super) {
    __extends(D28, _super);
    function D28() {
        _super.apply(this, arguments);
    }
    return D28;
})(C3);

var D29 = (function (_super) {
    __extends(D29, _super);
    function D29() {
        _super.apply(this, arguments);
    }
    return D29;
})(C3);
