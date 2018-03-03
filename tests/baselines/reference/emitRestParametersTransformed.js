//// [emitRestParametersTransformed.ts]
function foo1(x: number, ...rest: number[]) {
    return [x].concat(rest);
}

class C {
    constructor(x: number, ...rest: number[]) {
        this.foo2(x);
        this.foo2(x, ...rest);
    }
    private foo2(x: number, ...rest: number[]) {
        return rest;
    }
}

class D extends C {
    constructor(...rest: number[]) {
        super(0, ...rest);
    }
}


//// [emitRestParametersTransformed.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function foo1(x) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return [x].concat(rest);
}
var C = /** @class */ (function () {
    function C(x) {
        this.foo2(x);
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this.foo2.apply(this, [x].concat(rest));
    }
    C.prototype.foo2 = function (x) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        return rest;
    };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        return _super.apply(this, [0].concat(rest)) || this;
    }
    return D;
}(C));
