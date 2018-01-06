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
var C = /** @class */ (function () {
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
    return C;
}());
var C2 = /** @class */ (function () {
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
