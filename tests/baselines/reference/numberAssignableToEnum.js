//// [numberAssignableToEnum.ts]
enum E { A }
var n: number;
var e: E;
e = n;
n = e;

//// [numberAssignableToEnum.js]
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var n;
var e;
e = n;
n = e;
