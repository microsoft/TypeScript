//// [asyncArrowFunctionCapturesThis_es6.ts]
class C {
   method() {
      var fn = async () => await this;      
   }
}


//// [asyncArrowFunctionCapturesThis_es6.js]
class C {
    method() {
        var fn = () => __awaiter([this], function* () { return yield this; });
    }
}
