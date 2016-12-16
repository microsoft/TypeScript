//// [underscoreThisInDerivedClass01.ts]
// @target es5

// Original test intent:
// When arrow functions capture 'this', the lexical 'this' owner
// currently captures 'this' using a variable named '_this'.
// That means that '_this' becomes a reserved identifier in certain places.
//
// Constructors have adopted the same identifier name ('_this')
// for capturing any potential return values from super calls,
// so we expect the same behavior.

class C {
    constructor() {
        return {};
    }
}

class D extends C {
    constructor() {
        var _this = "uh-oh?";
        super();
    }
}

//// [underscoreThisInDerivedClass01.js]
// @target es5
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Original test intent:
// When arrow functions capture 'this', the lexical 'this' owner
// currently captures 'this' using a variable named '_this'.
// That means that '_this' becomes a reserved identifier in certain places.
//
// Constructors have adopted the same identifier name ('_this')
// for capturing any potential return values from super calls,
// so we expect the same behavior.
var C = (function () {
    function C() {
        return {};
    }
    return C;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this;
        var _this = "uh-oh?";
        _this = _super.call(this) || this;
        return _this;
    }
    return D;
}(C));
