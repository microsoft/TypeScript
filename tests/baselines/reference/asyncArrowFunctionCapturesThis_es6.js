//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncArrowFunctionCapturesThis_es6.ts] ////

//// [asyncArrowFunctionCapturesThis_es6.ts]
class C {
   method() {
      var fn = async () => await this;      
   }
}


//// [asyncArrowFunctionCapturesThis_es6.js]
class C {
    method() {
        var fn = () => __awaiter(this, void 0, void 0, function* () { return yield this; });
    }
}
