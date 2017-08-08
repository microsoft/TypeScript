//// [commentsTypeParameters.ts]
class C</**docComment for type parameter*/ T> {
    method</**docComment of method type parameter */ U extends T>(a: U) {
    }
    static staticmethod</**docComment of method type parameter */ U>(a: U) {
    }

    private privatemethod</**docComment of method type parameter */ U extends T>(a: U) {
    }
    private static privatestaticmethod</**docComment of method type parameter */ U>(a: U) {
    }
}

function compare</**type*/T>(a: T, b: T) {
    return a === b;
}

//// [commentsTypeParameters.js]
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
    C.prototype.method = function (a) {
    };
    C.staticmethod = function (a) {
    };
    C.prototype.privatemethod = function (a) {
    };
    C.privatestaticmethod = function (a) {
    };
    __names(C.prototype, ["method", "privatemethod"]);
    return C;
}());
function compare(a, b) {
    return a === b;
}


//// [commentsTypeParameters.d.ts]
declare class C</**docComment for type parameter*/ T> {
    method</**docComment of method type parameter */ U extends T>(a: U): void;
    static staticmethod</**docComment of method type parameter */ U>(a: U): void;
    private privatemethod</**docComment of method type parameter */ U>(a);
    private static privatestaticmethod</**docComment of method type parameter */ U>(a);
}
declare function compare</**type*/ T>(a: T, b: T): boolean;
