//// [tests/cases/compiler/enumWithExport.ts] ////

//// [enumWithExport.ts]
namespace x {
  export let y = 123
}
enum x {
  z = y
}

//// [enumWithExport.js]
var x;
(function (x) {
    x.y = 123;
})(x || (x = {}));
(function (x) {
    x[x["z"] = y] = "z";
})(x || (x = {}));
