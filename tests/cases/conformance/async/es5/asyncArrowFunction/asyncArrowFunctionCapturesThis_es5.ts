// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
class C {
   method() {
      var fn = async () => await this;
   }
}
