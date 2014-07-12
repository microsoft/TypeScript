//// [derivedClassParameterProperties.js]
// ordering of super calls in derived constructors matters depending on other class contents
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
    function Derived(y) {
        var a = 1;
        _super.call(this); // ok
    }
    return Derived;
})(Base);

var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2(y) {
        var a = 1;
        this.y = y;
        _super.call(this); // error
    }
    return Derived2;
})(Base);

var Derived3 = (function (_super) {
    __extends(Derived3, _super);
    function Derived3(y) {
        _super.call(this); // ok
        this.y = y;
        var a = 1;
    }
    return Derived3;
})(Base);

var Derived4 = (function (_super) {
    __extends(Derived4, _super);
    function Derived4(y) {
        var b = 2;
        this.a = 1;
        _super.call(this); // error
    }
    return Derived4;
})(Base);

var Derived5 = (function (_super) {
    __extends(Derived5, _super);
    function Derived5(y) {
        _super.call(this); // ok
        this.a = 1;
        var b = 2;
    }
    return Derived5;
})(Base);

var Derived6 = (function (_super) {
    __extends(Derived6, _super);
    function Derived6(y) {
        this.a = 1;
        var b = 2;
        _super.call(this); // ok
    }
    return Derived6;
})(Base);

var Derived7 = (function (_super) {
    __extends(Derived7, _super);
    function Derived7(y) {
        this.a = 3;
        this.a = 1;
        this.b = 3;
        _super.call(this); // error
    }
    return Derived7;
})(Base);

var Derived8 = (function (_super) {
    __extends(Derived8, _super);
    function Derived8(y) {
        _super.call(this); // ok
        this.a = 1;
        this.a = 3;
        this.b = 3;
    }
    return Derived8;
})(Base);

// generic cases of Derived7 and Derived8
var Base2 = (function () {
    function Base2() {
    }
    return Base2;
})();

var Derived9 = (function (_super) {
    __extends(Derived9, _super);
    function Derived9(y) {
        this.a = 3;
        this.a = 1;
        this.b = 3;
        _super.call(this); // error
    }
    return Derived9;
})(Base2);

var Derived10 = (function (_super) {
    __extends(Derived10, _super);
    function Derived10(y) {
        _super.call(this); // ok
        this.a = 1;
        this.a = 3;
        this.b = 3;
    }
    return Derived10;
})(Base2);
