// @target: es2017
// @noEmitHelpers: true
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);      
   }
}
