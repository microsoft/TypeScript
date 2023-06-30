//// [tests/cases/compiler/superInObjectLiterals_ES5.ts] ////

//// [superInObjectLiterals_ES5.ts]
var obj = {
    __proto__: {
        method() {
        }
    },
    method() {
        super.method();
    },
    get prop() {
        super.method();
        return 10;
    },
    set prop(value) {
        super.method();
    },
    p1: function () {
        super.method();
    },
    p2: function f() {
        super.method();
    },
    p3: () => {
        super.method();
    }
};

class A {
    method() { }
}

class B extends A {
    f() {
        var obj = {
            __proto__: {
                method() {
                }
            },
            method() {
                super.method();
            },
            get prop() {
                super.method();
                return 10;
            },
            set prop(value) {
                super.method();
            },
            p1: function () {
                super.method();
            },
            p2: function f() {
                super.method();
            },
            p3: () => {
                super.method();
            }
        };
    }
}

//// [superInObjectLiterals_ES5.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _this = this;
var obj = {
    __proto__: {
        method: function () {
        }
    },
    method: function () {
        _super.method.call(this);
    },
    get prop() {
        _super.method.call(this);
        return 10;
    },
    set prop(value) {
        _super.method.call(this);
    },
    p1: function () {
        _super.method.call(this);
    },
    p2: function f() {
        _super.method.call(this);
    },
    p3: function () {
        _super.method.call(_this);
    }
};
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.method = function () { };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.f = function () {
        var _this = this;
        var obj = {
            __proto__: {
                method: function () {
                }
            },
            method: function () {
                _super.method.call(this);
            },
            get prop() {
                _super.method.call(this);
                return 10;
            },
            set prop(value) {
                _super.method.call(this);
            },
            p1: function () {
                _super.method.call(this);
            },
            p2: function f() {
                _super.method.call(this);
            },
            p3: function () {
                _super.prototype.method.call(_this);
            }
        };
    };
    return B;
}(A));
