//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncArrowFunctionCapturesArguments_es6.ts] ////

//// [asyncArrowFunctionCapturesArguments_es6.ts]
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);
   }
}

function f() {
   return async () => async () => arguments.length;
}

//// [asyncArrowFunctionCapturesArguments_es6.js]
class C {
    method() {
        function other() { }
        var fn = async () => await other.apply(this, arguments);
    }
}
function f() {
    return async () => async () => arguments.length;
}
