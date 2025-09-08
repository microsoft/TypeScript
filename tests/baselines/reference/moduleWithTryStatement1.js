//// [tests/cases/compiler/moduleWithTryStatement1.ts] ////

//// [moduleWithTryStatement1.ts]
namespace M {
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
