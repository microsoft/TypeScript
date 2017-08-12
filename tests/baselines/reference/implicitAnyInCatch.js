//// [implicitAnyInCatch.ts]
// this should not be an error
try { } catch (error) {
    if (error.number === -2147024809) { }
}
for (var key in this) { }

class C {
    public temp() {
        for (var x in this) {
        }
    }
}



//// [implicitAnyInCatch.js]
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
// this should not be an error
try { }
catch (error) {
    if (error.number === -2147024809) { }
}
for (var key in this) { }
var C = (function () {
    function C() {
    }
    C.prototype.temp = function () {
        for (var x in this) {
        }
    };
    __names(C.prototype, ["temp"]);
    return C;
}());
