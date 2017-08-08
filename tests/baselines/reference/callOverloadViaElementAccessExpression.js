//// [callOverloadViaElementAccessExpression.ts]
class C {
    foo(x: number): number;
    foo(x: string): string;
    foo(x: any): any {
        return null;
    }
}

var c = new C();
var r: string = c['foo'](1);
var r2: number = c['foo']('');

//// [callOverloadViaElementAccessExpression.js]
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
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        return null;
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var c = new C();
var r = c['foo'](1);
var r2 = c['foo']('');
