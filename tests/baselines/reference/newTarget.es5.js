//// [tests/cases/conformance/es6/newTarget/newTarget.es5.ts] ////

//// [newTarget.es5.ts]
class A {
    constructor() {
        const a = new.target;
        const b = () => new.target;
    }
    static c = function () { return new.target; }
    d = function () { return new.target; }
}

class B extends A {
    constructor() {
        super();
        const e = new.target;
        const f = () => new.target;
    }
}

function f1() {
    const g = new.target;
    const h = () => new.target;
}

const f2 = function () {
    const i = new.target;
    const j = () => new.target;
}

const O = {
    k: function () { return new.target; }
};



//// [newTarget.es5.js]
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
var A = /** @class */ (function () {
    function A() {
        var _newTarget = this.constructor;
        this.d = function _a() {
            var _newTarget = this && this instanceof _a ? this.constructor : void 0;
            return _newTarget;
        };
        var a = _newTarget;
        var b = function () { return _newTarget; };
    }
    A.c = function _a() {
        var _newTarget = this && this instanceof _a ? this.constructor : void 0;
        return _newTarget;
    };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        var _newTarget = this.constructor;
        var _this = _super.call(this) || this;
        var e = _newTarget;
        var f = function () { return _newTarget; };
        return _this;
    }
    return B;
}(A));
function f1() {
    var _newTarget = this && this instanceof f1 ? this.constructor : void 0;
    var g = _newTarget;
    var h = function () { return _newTarget; };
}
var f2 = function f2() {
    var _newTarget = this && this instanceof f2 ? this.constructor : void 0;
    var i = _newTarget;
    var j = function () { return _newTarget; };
};
var O = {
    k: function k() {
        var _newTarget = this && this instanceof k ? this.constructor : void 0;
        return _newTarget;
    }
};
