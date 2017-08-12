//// [computedPropertyNames3_ES5.ts]
var id;
class C {
    [0 + 1]() { }
    static [() => { }]() { }
    get [delete id]() { }
    set [[0, 1]](v) { }
    static get [<String>""]() { }
    static set [id.toString()](v) { }
}

//// [computedPropertyNames3_ES5.js]
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
var id;
var C = (function () {
    function C() {
    }
    C.prototype[_a = 0 + 1] = function () { };
    C[function () { }] = function () { };
    Object.defineProperty(C.prototype, delete id, {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, [0, 1], {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, "", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C, id.toString(), {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    __names(C.prototype, [_a]);
    return C;
    var _a;
}());
