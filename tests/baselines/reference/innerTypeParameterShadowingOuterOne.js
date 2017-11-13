//// [innerTypeParameterShadowingOuterOne.ts]
// inner type parameters shadow outer ones of the same name
// no errors expected

function f<T extends Date>() {
    function g<T extends Number>() {
        var x: T;
        x.toFixed();
    }
    var x: T;
    x.getDate();
}

function f2<T extends Date, U extends Date>() {
    function g<T extends Number, U extends Number>() {
        var x: U;
        x.toFixed();
    }
    var x: U;
    x.getDate();
}
//function f2<T extends Date, U extends T>() {
//    function g<T extends Number, U extends T>() {
//        var x: U;
//        x.toFixed();
//    }
//    var x: U;
//    x.getDate();
//}

//// [innerTypeParameterShadowingOuterOne.js]
// inner type parameters shadow outer ones of the same name
// no errors expected
function f() {
    function g() {
        var x;
        x.toFixed();
    }
    var x;
    x.getDate();
}
function f2() {
    function g() {
        var x;
        x.toFixed();
    }
    var x;
    x.getDate();
}
//function f2<T extends Date, U extends T>() {
//    function g<T extends Number, U extends T>() {
//        var x: U;
//        x.toFixed();
//    }
//    var x: U;
//    x.getDate();
//}
