// @target: es2017
// @noEmitHelpers: true
class C {
   method() {
      var fn = async () => await this;      
   }
}
