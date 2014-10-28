//// [enumMergedWithModuleAssignment.ts]
module M {
    export var x;
}
enum M {
    y
}
var expr: string;
M["x"] = 1; // want to allow this one
--M.x; // want to allow this one
M["x"]++; // want to allow this one

M["y"] = 1; // want to disallow this one
M.y--; // want to disallow this one
++M["y"]; // want to disallow this one


M[expr] = 1; // err on the side of too strict and disallow this
M.expr++; // err on the side of too strict and disallow this
--M[expr]; // err on the side of too strict and disallow this

//// [enumMergedWithModuleAssignment.js]
var M;
(function (M) {
    M.x;
})(M || (M = {}));
var M;
(function (M) {
    M[M["y"] = 0] = "y";
})(M || (M = {}));
var expr;
M["x"] = 1; // want to allow this one
--M.x; // want to allow this one
M["x"]++; // want to allow this one
M["y"] = 1; // want to disallow this one
0 /* y */--; // want to disallow this one
++M["y"]; // want to disallow this one
M[expr] = 1; // err on the side of too strict and disallow this
M.expr++; // err on the side of too strict and disallow this
--M[expr]; // err on the side of too strict and disallow this
