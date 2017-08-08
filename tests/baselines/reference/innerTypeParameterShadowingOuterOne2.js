//// [innerTypeParameterShadowingOuterOne2.ts]
// inner type parameters shadow outer ones of the same name
// no errors expected

class C<T extends Date> {
    g<T extends Number>() {
        var x: T;
        x.toFixed();
    }

    h() {
        var x: T;
        x.getDate();
    }
}

class C2<T extends Date, U extends Date> {
    g<T extends Number, U extends Number>() {
        var x: U;
        x.toFixed();
    }

    h() {
        var x: U;
        x.getDate();
    }
}
//class C2<T extends Date, U extends T> {
//    g<T extends Number, U extends T>() {
//        var x: U;
//        x.toFixed();
//    }

//    h() {
//        var x: U;
//        x.getDate();
//    }
//}

//// [innerTypeParameterShadowingOuterOne2.js]
// inner type parameters shadow outer ones of the same name
// no errors expected
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
    C.prototype.g = function () {
        var x;
        x.toFixed();
    };
    C.prototype.h = function () {
        var x;
        x.getDate();
    };
    __names(C.prototype, ["g", "h"]);
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    C2.prototype.g = function () {
        var x;
        x.toFixed();
    };
    C2.prototype.h = function () {
        var x;
        x.getDate();
    };
    __names(C2.prototype, ["g", "h"]);
    return C2;
}());
//class C2<T extends Date, U extends T> {
//    g<T extends Number, U extends T>() {
//        var x: U;
//        x.toFixed();
//    }
//    h() {
//        var x: U;
//        x.getDate();
//    }
//} 
