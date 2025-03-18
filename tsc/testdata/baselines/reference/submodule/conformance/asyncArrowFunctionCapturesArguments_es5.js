//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunctionCapturesArguments_es5.ts] ////

//// [asyncArrowFunctionCapturesArguments_es5.ts]
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);
   }
}


//// [asyncArrowFunctionCapturesArguments_es5.js]
class C {
    method() {
        function other() { }
        var fn = async () => await other.apply(this, arguments);
    }
}
