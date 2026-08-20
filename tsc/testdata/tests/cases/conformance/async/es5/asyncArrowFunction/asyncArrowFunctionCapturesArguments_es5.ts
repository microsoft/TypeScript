// @target: ES5, ES2015
// @lib: es5,es2015.promise
// @noEmitHelpers: true
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);
   }
}
