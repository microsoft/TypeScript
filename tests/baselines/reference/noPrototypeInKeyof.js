//// [tests/cases/compiler/noPrototypeInKeyof.ts] ////

//// [noPrototypeInKeyof.ts]
class X {
  static K = "";
}
type T = keyof typeof X;
// Should error.
const m: T = "prototype";


//// [noPrototypeInKeyof.js]
var X = /** @class */ (function () {
    function X() {
    }
    X.K = "";
    return X;
}());
// Should error.
var m = "prototype";
