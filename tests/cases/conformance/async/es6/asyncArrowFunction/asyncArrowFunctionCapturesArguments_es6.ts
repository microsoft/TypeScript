// @target: ES6
// @noEmitHelpers: true
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);
   }
}

function f() {
   return async () => async () => arguments.length;
}