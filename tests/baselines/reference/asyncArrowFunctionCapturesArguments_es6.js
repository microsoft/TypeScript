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
        var fn = () => {
            var arguments_1 = arguments;
            return __awaiter(this, void 0, void 0, function* () { return yield other.apply(this, arguments_1); });
        };
    }
}
function f() {
    return () => {
        var arguments_2 = arguments;
        return __awaiter(this, void 0, void 0, function* () { return () => __awaiter(this, void 0, void 0, function* () { return arguments_2.length; }); });
    };
}
