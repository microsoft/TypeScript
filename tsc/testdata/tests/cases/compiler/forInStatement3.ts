// @target: es2015
// @strict: false
function F<T>() {
  var expr: T;
  for (var a in expr) {
  }
}