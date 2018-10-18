//// [asyncArrowFunction7_es6.ts]
var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}

//// [asyncArrowFunction7_es6.js]
var bar = () => __awaiter(this, void 0, void 0, function* () {
    // 'await' here is an identifier, and not an await expression.
    var foo = (a = yield ) => __awaiter(this, void 0, void 0, function* () {
    });
});
