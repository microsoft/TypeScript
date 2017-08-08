//// [instantiatedReturnTypeContravariance.ts]
interface B<T> {

name: string;

x(): T;

}
 
class c {

foo(): B<void> {

return null;

}

}
 
class d extends c {

foo(): B<number> {

return null;

}

}

 


//// [instantiatedReturnTypeContravariance.js]
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
var c = (function () {
    function c() {
    }
    c.prototype.foo = function () {
        return null;
    };
    __names(c.prototype, ["foo"]);
    return c;
}());
var d = (function (_super) {
    __extends(d, _super);
    function d() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    d.prototype.foo = function () {
        return null;
    };
    __names(d.prototype, ["foo"]);
    return d;
}(c));
