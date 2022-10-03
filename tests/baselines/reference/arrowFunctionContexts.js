//// [arrowFunctionContexts.ts]
// Arrow function used in with statement
with (window) {
    var p = () => this;
}

// Arrow function as argument to super call
class Base {
    constructor(n: any) { }
}

class Derived extends Base {
    constructor() {
        super(() => this);
    }
}

// Arrow function as function argument
window.setTimeout(() => null, 100);

// Arrow function as value in array literal

var obj = (n: number) => '';
var obj: { (n: number): string; }; // OK

var arr = [(n: number) => ''];
var arr: { (n: number): string; }[]; // Incorrect error here (bug 829597)

// Arrow function as enum value
enum E {
    x = () => 4, // Error expected
    y = (() => this).length // error, can't use this in enum
}

// Arrow function as module variable initializer
module M {
    export var a = (s) => '';
    var b = (s) => s;
}

// Repeat above for module members that are functions? (necessary to redo all of them?)
module M2 {
    // Arrow function used in with statement
    with (window) {
        var p = () => this;
    }

    // Arrow function as argument to super call
    class Base {
        constructor(n: any) { }
    }

    class Derived extends Base {
        constructor() {
            super(() => this);
        }
    }

    // Arrow function as function argument
    window.setTimeout(() => null, 100);

    // Arrow function as value in array literal

    var obj = (n: number) => '';
    var obj: { (n: number): string; }; // OK

    var arr = [(n: number) => ''];
    var arr: { (n: number): string; }[]; // Incorrect error here (bug 829597)

    // Arrow function as enum value
    enum E {
        x = () => 4, // Error expected
        y = (() => this).length
    }

    // Arrow function as module variable initializer
    module M {
        export var a = (s) => '';
        var b = (s) => s;
    }

}

// <Identifier>(ParamList) => { ... } is a generic arrow function
var generic1 = <T>(n: T) => [n];
var generic1: { <T>(n: T): T[] }; // Incorrect error, Bug 829597
var generic2 = <T>(n: T) => { return [n]; };
var generic2: { <T>(n: T): T[] };

// <Identifier> ((ParamList) => { ... } ) is a type assertion to an arrow function
var asserted1 = <any>((n) => [n]);
var asserted1: any;
var asserted2 = <any>((n) => { return n; });
var asserted2: any;



//// [arrowFunctionContexts.js]
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
// Arrow function used in with statement
with (window) {
    var p = function () { return _this; };
}
// Arrow function as argument to super call
var Base = /** @class */ (function () {
    function Base(n) {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super.call(this, function () { return _this; }) || this;
        return _this;
    }
    return Derived;
}(Base));
// Arrow function as function argument
window.setTimeout(function () { return null; }, 100);
// Arrow function as value in array literal
var obj = function (n) { return ''; };
var obj; // OK
var arr = [function (n) { return ''; }];
var arr; // Incorrect error here (bug 829597)
// Arrow function as enum value
var E;
(function (E) {
    var _this = this;
    E[E["x"] = function () { return 4; }] = "x";
    E[E["y"] = (function () { return _this; }).length] = "y"; // error, can't use this in enum
})(E || (E = {}));
// Arrow function as module variable initializer
var M;
(function (M) {
    M.a = function (s) { return ''; };
    var b = function (s) { return s; };
})(M || (M = {}));
// Repeat above for module members that are functions? (necessary to redo all of them?)
var M2;
(function (M2) {
    var _this = this;
    // Arrow function used in with statement
    with (window) {
        var p = function () { return _this; };
    }
    // Arrow function as argument to super call
    var Base = /** @class */ (function () {
        function Base(n) {
        }
        return Base;
    }());
    var Derived = /** @class */ (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            var _this = _super.call(this, function () { return _this; }) || this;
            return _this;
        }
        return Derived;
    }(Base));
    // Arrow function as function argument
    window.setTimeout(function () { return null; }, 100);
    // Arrow function as value in array literal
    var obj = function (n) { return ''; };
    var obj; // OK
    var arr = [function (n) { return ''; }];
    var arr; // Incorrect error here (bug 829597)
    // Arrow function as enum value
    var E;
    (function (E) {
        var _this = this;
        E[E["x"] = function () { return 4; }] = "x";
        E[E["y"] = (function () { return _this; }).length] = "y";
    })(E || (E = {}));
    // Arrow function as module variable initializer
    var M;
    (function (M) {
        M.a = function (s) { return ''; };
        var b = function (s) { return s; };
    })(M || (M = {}));
})(M2 || (M2 = {}));
// <Identifier>(ParamList) => { ... } is a generic arrow function
var generic1 = function (n) { return [n]; };
var generic1; // Incorrect error, Bug 829597
var generic2 = function (n) { return [n]; };
var generic2;
// <Identifier> ((ParamList) => { ... } ) is a type assertion to an arrow function
var asserted1 = (function (n) { return [n]; });
var asserted1;
var asserted2 = (function (n) { return n; });
var asserted2;
