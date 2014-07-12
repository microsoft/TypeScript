//// [subtypesOfTypeParameterWithRecursiveConstraints.js]
// checking whether other types are subtypes of type parameters with constraints
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
function f(t, u, v) {
    // error
    var r1 = true ? t : u;
    var r1 = true ? u : t;

    // error
    var r2 = true ? t : v;
    var r2 = true ? v : t;

    // error
    var r3 = true ? v : u;
    var r3 = true ? u : v;

    // ok?
    var r4 = true ? t : new Foo();
    var r4 = true ? new Foo() : t;

    // ok?
    var r5 = true ? u : new Foo();
    var r5 = true ? new Foo() : u;

    // ok?
    var r6 = true ? v : new Foo();
    var r6 = true ? new Foo() : v;

    // ok?
    var r7 = true ? t : new Foo();
    var r7 = true ? new Foo() : t;

    // ok?
    var r8 = true ? u : new Foo();
    var r8 = true ? new Foo() : u;

    // ok?
    var r9 = true ? v : new Foo();
    var r9 = true ? new Foo() : v;

    // ok?
    var r10 = true ? t : new Foo();
    var r10 = true ? new Foo() : t;

    // ok?
    var r11 = true ? u : new Foo();
    var r11 = true ? new Foo() : u;

    // ok?
    var r12 = true ? v : new Foo();
    var r12 = true ? new Foo() : v;
}

var M1;
(function (M1) {
    var Base = (function () {
        function Base() {
        }
        return Base;
    })();

    var D1 = (function (_super) {
        __extends(D1, _super);
        function D1() {
            _super.apply(this, arguments);
        }
        return D1;
    })(Base);

    var D2 = (function (_super) {
        __extends(D2, _super);
        function D2() {
            _super.apply(this, arguments);
        }
        return D2;
    })(Base);

    var D3 = (function (_super) {
        __extends(D3, _super);
        function D3() {
            _super.apply(this, arguments);
        }
        return D3;
    })(Base);

    var D4 = (function (_super) {
        __extends(D4, _super);
        function D4() {
            _super.apply(this, arguments);
        }
        return D4;
    })(Base);

    var D5 = (function (_super) {
        __extends(D5, _super);
        function D5() {
            _super.apply(this, arguments);
        }
        return D5;
    })(Base);

    var D6 = (function (_super) {
        __extends(D6, _super);
        function D6() {
            _super.apply(this, arguments);
        }
        return D6;
    })(Base);

    var D7 = (function (_super) {
        __extends(D7, _super);
        function D7() {
            _super.apply(this, arguments);
        }
        return D7;
    })(Base);

    var D8 = (function (_super) {
        __extends(D8, _super);
        function D8() {
            _super.apply(this, arguments);
        }
        return D8;
    })(Base);

    var D9 = (function (_super) {
        __extends(D9, _super);
        function D9() {
            _super.apply(this, arguments);
        }
        return D9;
    })(Base);
})(M1 || (M1 = {}));

var M2;
(function (M2) {
    var Base2 = (function () {
        function Base2() {
        }
        return Base2;
    })();

    var D1 = (function (_super) {
        __extends(D1, _super);
        function D1() {
            _super.apply(this, arguments);
        }
        return D1;
    })(Base2);

    var D2 = (function (_super) {
        __extends(D2, _super);
        function D2() {
            _super.apply(this, arguments);
        }
        return D2;
    })(Base2);

    var D3 = (function (_super) {
        __extends(D3, _super);
        function D3() {
            _super.apply(this, arguments);
        }
        return D3;
    })(Base2);

    var D4 = (function (_super) {
        __extends(D4, _super);
        function D4() {
            _super.apply(this, arguments);
        }
        return D4;
    })(Base2);

    var D5 = (function (_super) {
        __extends(D5, _super);
        function D5() {
            _super.apply(this, arguments);
        }
        return D5;
    })(Base2);

    var D6 = (function (_super) {
        __extends(D6, _super);
        function D6() {
            _super.apply(this, arguments);
        }
        return D6;
    })(Base2);

    var D7 = (function (_super) {
        __extends(D7, _super);
        function D7() {
            _super.apply(this, arguments);
        }
        return D7;
    })(Base2);

    var D8 = (function (_super) {
        __extends(D8, _super);
        function D8() {
            _super.apply(this, arguments);
        }
        return D8;
    })(Base2);

    var D9 = (function (_super) {
        __extends(D9, _super);
        function D9() {
            _super.apply(this, arguments);
        }
        return D9;
    })(Base2);
})(M2 || (M2 = {}));
