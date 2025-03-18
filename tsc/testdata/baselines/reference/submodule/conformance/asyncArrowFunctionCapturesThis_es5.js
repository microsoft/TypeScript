//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunctionCapturesThis_es5.ts] ////

//// [asyncArrowFunctionCapturesThis_es5.ts]
class C {
   method() {
      var fn = async () => await this;
   }
}


//// [asyncArrowFunctionCapturesThis_es5.js]
class C {
    method() {
        var fn = async () => await this;
    }
}
