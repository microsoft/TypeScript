function x() {
 with({}) {
  function f() {
   () => this;
  }
 }
}