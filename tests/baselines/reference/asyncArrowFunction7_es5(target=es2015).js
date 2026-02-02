//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction7_es5.ts] ////

//// [asyncArrowFunction7_es5.ts]
var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}

//// [asyncArrowFunction7_es5.js]
var bar = () => __awaiter(this, void 0, void 0, function* () {
    // 'await' here is an identifier, and not an await expression.
    var foo = (...args_1) => __awaiter(this, [...args_1], void 0, function* (a = yield ) {
    });
});
