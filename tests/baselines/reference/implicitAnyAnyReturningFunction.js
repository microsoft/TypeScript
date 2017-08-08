//// [implicitAnyAnyReturningFunction.ts]
function A() {
    return <any>"";
}

function B() {
    var someLocal: any = {};
    return someLocal;
}

class C {
    public A() {
        return <any>"";
    }

    public B() {
        var someLocal: any = {};
        return someLocal;
    }
}


//// [implicitAnyAnyReturningFunction.js]
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
function A() {
    return "";
}
function B() {
    var someLocal = {};
    return someLocal;
}
var C = (function () {
    function C() {
    }
    C.prototype.A = function () {
        return "";
    };
    C.prototype.B = function () {
        var someLocal = {};
        return someLocal;
    };
    __names(C.prototype, ["A", "B"]);
    return C;
}());


//// [implicitAnyAnyReturningFunction.d.ts]
declare function A(): any;
declare function B(): any;
declare class C {
    A(): any;
    B(): any;
}
