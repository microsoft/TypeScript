//// [computedPropertyNames28_ES5.ts]
class Base {
}
class C extends Base {
    constructor() {
        super();
        var obj = {
            [(super(), "prop")]() { }
        };
    }
}

//// [computedPropertyNames28_ES5.js]
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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = _super.call(this) || this;
        var obj = (_a = {},
            _a[_b = (_this = _super.call(this) || this, "prop")] = function () { }, __names(_a, [_b]),
            _a);
        return _this;
        var _a, _b;
    }
    return C;
}(Base));
