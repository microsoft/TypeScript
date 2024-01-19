//// [tests/cases/compiler/enumAssignmentCompat7.ts] ////

//// [enumAssignmentCompat7.ts]
namespace first {
    export enum E { A = 1 }
}

namespace second {
    export enum E { A = 2 }
}

class Base {
    method(param: first.E) {

    }
}

class Derived extends Base {
    override method(param: second.E) {
    }
}

function overloadingFunction(): first.E
function overloadingFunction(): second.E {
    return second.E.B
}

//// [enumAssignmentCompat7.js]
"use strict";
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
var first;
(function (first) {
    var E;
    (function (E) {
        E[E["A"] = 1] = "A";
    })(E = first.E || (first.E = {}));
})(first || (first = {}));
var second;
(function (second) {
    var E;
    (function (E) {
        E[E["A"] = 2] = "A";
    })(E = second.E || (second.E = {}));
})(second || (second = {}));
var Base = /** @class */ (function () {
    function Base() {
    }
    Base.prototype.method = function (param) {
    };
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Derived.prototype.method = function (param) {
    };
    return Derived;
}(Base));
function overloadingFunction() {
    return second.E.B;
}
