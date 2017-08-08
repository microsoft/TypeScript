//// [overloadOnConstInCallback1.ts]
class C {
    x1(a: number, callback: (x: 'hi') => number); // error
    x1(a: number, callback: (x: any) => number) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
    }
}

//// [overloadOnConstInCallback1.js]
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
    C.prototype.x1 = function (a, callback) {
        callback('hi');
        callback('bye');
        var hm = "hm";
        callback(hm);
    };
    __names(C.prototype, ["x1"]);
    return C;
}());
