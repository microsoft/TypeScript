//// [tests/cases/compiler/functionTypeArgumentAssignmentCompat.ts] ////

//// [functionTypeArgumentAssignmentCompat.ts]
var f : {
 <T>(x:T): T;
}

var g : {
 <S>() : S[];
} = () => [];

f = g;
var s = f("str").toUpperCase();

console.log(s);


//// [functionTypeArgumentAssignmentCompat.js]
var f;
var g = function () { return []; };
f = g;
var s = f("str").toUpperCase();
console.log(s);
