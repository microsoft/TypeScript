//// [moduleWithTryStatement1.ts]
module M {
  try {
  }
  catch (e) {
  }
}
var v = M;


//// [moduleWithTryStatement1.js]
var M;
(function (M) {
    try {
    }
    catch (e) {
    }
})(M || (M = {}));
var v = M;
