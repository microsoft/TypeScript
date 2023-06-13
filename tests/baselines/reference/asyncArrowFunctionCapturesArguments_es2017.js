//// [tests/cases/conformance/async/es2017/asyncArrowFunction/asyncArrowFunctionCapturesArguments_es2017.ts] ////

//// [asyncArrowFunctionCapturesArguments_es2017.ts]
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);      
   }
}


//// [asyncArrowFunctionCapturesArguments_es2017.js]
class C {
    method() {
        function other() { }
        var fn = async () => await other.apply(this, arguments);
    }
}
