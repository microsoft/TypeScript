// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);      
   }
}
