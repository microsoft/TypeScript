//// [enumCodeGenNewLines1.ts]
enum foo {
  b = 1,
  c = 2,
  d = 3
}


//// [enumCodeGenNewLines1.js]
var foo;
(function (foo) {
    foo[foo["b"] = 1] = "b";
    foo[foo["c"] = 2] = "c";
    foo[foo["d"] = 3] = "d";
})(foo || (foo = {}));
