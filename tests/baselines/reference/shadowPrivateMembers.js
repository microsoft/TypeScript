//// [shadowPrivateMembers.ts]
class base { private n() {} }
class derived extends base { private n() {} }


//// [shadowPrivateMembers.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
var base = (function () {
    function base() {
    }
    base.prototype.n = function () { };
    __names(base.prototype, ["n"]);
    return base;
}());
var derived = (function (_super) {
    __extends(derived, _super);
    function derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    derived.prototype.n = function () { };
    __names(derived.prototype, ["n"]);
    return derived;
}(base));
