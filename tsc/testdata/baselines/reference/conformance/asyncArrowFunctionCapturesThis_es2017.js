//// [tests/cases/conformance/async/es2017/asyncArrowFunction/asyncArrowFunctionCapturesThis_es2017.ts] ////

//// [asyncArrowFunctionCapturesThis_es2017.ts]
class C {
   method() {
      var fn = async () => await this;      
   }
}


//// [asyncArrowFunctionCapturesThis_es2017.js]
"use strict";
class C {
    method() {
        var fn = async () => await this;
    }
}
