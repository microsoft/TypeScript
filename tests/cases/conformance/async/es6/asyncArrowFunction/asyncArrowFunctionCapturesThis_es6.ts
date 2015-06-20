// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true
class C {
   method() {
      var fn = async () => await this;      
   }
}
