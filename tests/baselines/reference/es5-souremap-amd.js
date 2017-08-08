//// [es5-souremap-amd.ts]
class A
{
    constructor ()
    {

    }

    public B()
    {
        return 42;
    }
}

//// [es5-souremap-amd.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.B = function () {
        return 42;
    };
    __names(A.prototype, ["B"]);
    return A;
}());
//# sourceMappingURL=es5-souremap-amd.js.map