// @target: ES6
// @noEmitHelpers: true
class C {
   method() {
      var fn = async () => await this;      
   }
}
