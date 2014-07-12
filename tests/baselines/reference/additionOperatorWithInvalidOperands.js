//// [additionOperatorWithInvalidOperands.js]
function foo() {
}
var C = (function () {
    function C() {
    }
    C.foo = function () {
    };
    return C;
})();
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
var M;
(function (M) {
    M.a;
})(M || (M = {}));

var a;
var b;
var c;
var d;

// boolean + every type except any and string
var r1 = a + a;
var r2 = a + b;
var r3 = a + c;

// number + every type except any and string
var r4 = b + a;
var r5 = b + b;
var r6 = b + c;

// object + every type except any and string
var r7 = c + a;
var r8 = c + b;
var r9 = c + c;

// other cases
var r10 = a + true;
var r11 = true + false;
var r12 = true + 123;
var r13 = {} + {};
var r14 = b + d;
var r15 = b + foo;
var r16 = b + foo();
var r17 = b + C;
var r18 = 0 /* a */ + new C();
var r19 = 0 /* a */ + C.foo();
var r20 = 0 /* a */ + M;
