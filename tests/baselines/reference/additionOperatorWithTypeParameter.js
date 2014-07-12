//// [additionOperatorWithTypeParameter.js]
// type parameter type is not a valid operand of addition operator
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));

function foo(t, u) {
    var a;
    var b;
    var c;
    var d;
    var e;
    var g;
    var f;

    // type parameter as left operand
    var r1 = t + a;
    var r2 = t + b;
    var r3 = t + c;
    var r4 = t + d;
    var r5 = t + e;
    var r6 = t + g;
    var r7 = t + f;

    // type parameter as right operand
    var r8 = a + t;
    var r9 = b + t;
    var r10 = c + t;
    var r11 = d + t;
    var r12 = e + t;
    var r13 = g + t;
    var r14 = f + t;

    // other cases
    var r15 = t + null;
    var r16 = t + undefined;
    var r17 = t + t;
    var r18 = t + u;
    var r19 = t + (function () {
    });
    var r20 = t + [];
}
