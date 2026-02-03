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
        var fn = () => {
            var arguments_1 = arguments;
            return __awaiter(this, void 0, void 0, function* () { return yield other.apply(this, arguments_1); });
        };
    }
}
