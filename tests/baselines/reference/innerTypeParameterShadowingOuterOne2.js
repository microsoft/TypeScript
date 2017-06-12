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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.g = function () {
        var x;
        x.toFixed();
    };
    proto_1.h = function () {
        var x;
        x.getDate();
    };
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    var proto_2 = C2.prototype;
    proto_2.g = function () {
        var x;
        x.toFixed();
    };
    proto_2.h = function () {
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
