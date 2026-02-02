//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclarationCapturesArguments_es5.ts] ////

//// [asyncFunctionDeclarationCapturesArguments_es5.ts]
class C {
   method() {
      function other() {}
      async function fn () {
           await other.apply(this, arguments);
      }
   }
}


//// [asyncFunctionDeclarationCapturesArguments_es5.js]
class C {
    method() {
        function other() { }
        function fn() {
            var arguments_1 = arguments;
            return __awaiter(this, void 0, void 0, function* () {
                yield other.apply(this, arguments_1);
            });
        }
    }
}
