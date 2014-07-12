//// [implementingAnInterfaceExtendingClassWithPrivates2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        _super.apply(this, arguments);
    }
    return Bar;
})(Foo);

var Bar2 = (function (_super) {
    __extends(Bar2, _super);
    function Bar2() {
        _super.apply(this, arguments);
    }
    return Bar2;
})(Foo);

var Bar3 = (function (_super) {
    __extends(Bar3, _super);
    function Bar3() {
        _super.apply(this, arguments);
    }
    return Bar3;
})(Foo);

// another level of indirection
var M;
(function (M) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    })();

    var Baz = (function (_super) {
        __extends(Baz, _super);
        function Baz() {
            _super.apply(this, arguments);
        }
        return Baz;
    })(Foo);

    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            _super.apply(this, arguments);
        }
        return Bar;
    })(Foo);

    var Bar2 = (function (_super) {
        __extends(Bar2, _super);
        function Bar2() {
            _super.apply(this, arguments);
        }
        return Bar2;
    })(Foo);

    var Bar3 = (function (_super) {
        __extends(Bar3, _super);
        function Bar3() {
            _super.apply(this, arguments);
        }
        return Bar3;
    })(Foo);
})(M || (M = {}));

// two levels of privates
var M2;
(function (M2) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    })();

    var Baz = (function (_super) {
        __extends(Baz, _super);
        function Baz() {
            _super.apply(this, arguments);
        }
        return Baz;
    })(Foo);

    var Bar = (function (_super) {
        __extends(Bar, _super);
        function Bar() {
            _super.apply(this, arguments);
        }
        return Bar;
    })(Foo);

    var b;
    var r1 = b.z;
    var r2 = b.x;
    var r3 = b.y;

    var Bar2 = (function (_super) {
        __extends(Bar2, _super);
        function Bar2() {
            _super.apply(this, arguments);
        }
        return Bar2;
    })(Foo);

    var Bar3 = (function (_super) {
        __extends(Bar3, _super);
        function Bar3() {
            _super.apply(this, arguments);
        }
        return Bar3;
    })(Foo);
})(M2 || (M2 = {}));
