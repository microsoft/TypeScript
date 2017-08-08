//// [interfaceSubtyping.ts]
interface iface {
    foo(): void;
}
class Camera implements iface{
    constructor (public str: string) {
    }
    foo() {  return "s";   }
}


//// [interfaceSubtyping.js]
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
var Camera = (function () {
    function Camera(str) {
        this.str = str;
    }
    Camera.prototype.foo = function () { return "s"; };
    __names(Camera.prototype, ["foo"]);
    return Camera;
}());
