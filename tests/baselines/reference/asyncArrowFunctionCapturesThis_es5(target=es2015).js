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
        var fn = () => __awaiter(this, void 0, void 0, function* () { return yield this; });
    }
}
