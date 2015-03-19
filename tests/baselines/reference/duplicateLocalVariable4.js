//// [duplicateLocalVariable4.ts]
enum E{
a
}
 
var x = E;
var x = E.a;

//// [duplicateLocalVariable4.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
})(E || (E = {}));
var x = E;
var x = E.a;
