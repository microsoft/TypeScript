// @target: es2015
function x() {
 with({}) {
  function f() {
   () => this;
  }
 }
}