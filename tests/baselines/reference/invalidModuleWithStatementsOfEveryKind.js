//// [invalidModuleWithStatementsOfEveryKind.ts]
// All of these should be an error

module Y {
    public class A { s: string }

    public class BB<T> extends A {
        id: number;
    }
}

module Y2 {
    public class AA<T> { s: T }
    public interface I { id: number }

    public class B extends AA<string> implements I { id: number }
}

module Y3 {
    public module Module {
        class A { s: string }
    }
}

module Y4 {
    public enum Color { Blue, Red }
}

module YY {
    private class A { s: string }

    private class BB<T> extends A {
        id: number;
    }
}

module YY2 {
    private class AA<T> { s: T }
    private interface I { id: number }

    private class B extends AA<string> implements I { id: number }
}

module YY3 {
    private module Module {
        class A { s: string }
    }
}

module YY4 {
    private enum Color { Blue, Red }
}


module YYY {
    static class A { s: string }

    static class BB<T> extends A {
        id: number;
    }
}

module YYY2 {
    static class AA<T> { s: T }
    static interface I { id: number }

    static class B extends AA<string> implements I { id: number }
}

module YYY3 {
    static module Module {
        class A { s: string }
    }
}

module YYY4 {
    static enum Color { Blue, Red }
}


//// [invalidModuleWithStatementsOfEveryKind.js]
// All of these should be an error
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Y = Y || (Y = {});
(function (Y) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    var BB = /** @class */ (function (_super) {
        __extends(BB, _super);
        function BB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BB;
    }(A));
})(Y);
var Y2 = Y2 || (Y2 = {});
(function (Y2) {
    var AA = /** @class */ (function () {
        function AA() {
        }
        return AA;
    }());
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(AA));
})(Y2);
var Y3 = Y3 || (Y3 = {});
(function (Y3) {
    var Module = Module || (Module = {});
    (function (Module) {
        var A = /** @class */ (function () {
            function A() {
            }
            return A;
        }());
    })(Module);
})(Y3);
var Y4 = Y4 || (Y4 = {});
(function (Y4) {
    var Color = Color || (Color = {});
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color);
})(Y4);
var YY = YY || (YY = {});
(function (YY) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    var BB = /** @class */ (function (_super) {
        __extends(BB, _super);
        function BB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BB;
    }(A));
})(YY);
var YY2 = YY2 || (YY2 = {});
(function (YY2) {
    var AA = /** @class */ (function () {
        function AA() {
        }
        return AA;
    }());
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(AA));
})(YY2);
var YY3 = YY3 || (YY3 = {});
(function (YY3) {
    var Module = Module || (Module = {});
    (function (Module) {
        var A = /** @class */ (function () {
            function A() {
            }
            return A;
        }());
    })(Module);
})(YY3);
var YY4 = YY4 || (YY4 = {});
(function (YY4) {
    var Color = Color || (Color = {});
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color);
})(YY4);
var YYY = YYY || (YYY = {});
(function (YYY) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    var BB = /** @class */ (function (_super) {
        __extends(BB, _super);
        function BB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BB;
    }(A));
})(YYY);
var YYY2 = YYY2 || (YYY2 = {});
(function (YYY2) {
    var AA = /** @class */ (function () {
        function AA() {
        }
        return AA;
    }());
    var B = /** @class */ (function (_super) {
        __extends(B, _super);
        function B() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return B;
    }(AA));
})(YYY2);
var YYY3 = YYY3 || (YYY3 = {});
(function (YYY3) {
    var Module = Module || (Module = {});
    (function (Module) {
        var A = /** @class */ (function () {
            function A() {
            }
            return A;
        }());
    })(Module);
})(YYY3);
var YYY4 = YYY4 || (YYY4 = {});
(function (YYY4) {
    var Color = Color || (Color = {});
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color);
})(YYY4);
