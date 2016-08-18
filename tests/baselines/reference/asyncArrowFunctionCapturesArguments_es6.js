//// [asyncArrowFunctionCapturesArguments_es6.ts]
class C {
   method() {
      function other() {}
      var fn = async () => await other.apply(this, arguments);      
   }
}


//// [asyncArrowFunctionCapturesArguments_es6.js]
class C {
    method() {
        function other() { }
        var fn = () => __awaiter(this, arguments, void 0, function* () { return yield other.apply(this, arguments); });
    }
}
