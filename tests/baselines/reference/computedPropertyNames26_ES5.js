//// [computedPropertyNames26_ES5.ts]
class Base {
    bar() {
        return 0;
    }
}
class C extends Base {
    [
        { [super.bar()]: 1 }[0]
    ]() { }
}

//// [computedPropertyNames26_ES5.js]
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
var Base = (function () {
    function Base() {
    }
    Base.prototype.bar = function () {
        return 0;
    };
    __names(Base.prototype, ["bar"]);
    return Base;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype[_a = (_b = {}, _b[_super.bar.call(this)] = 1, _b)[0]] = function () { };
    __names(C.prototype, [_a]);
    return C;
    var _b, _a;
}(Base));
