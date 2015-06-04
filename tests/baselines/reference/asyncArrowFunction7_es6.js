//// [asyncArrowFunction7_es6.ts]

var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}

//// [asyncArrowFunction7_es6.js]
var bar = () => __awaiter(function* () {
    // 'await' here is an identifier, and not an await expression.
    var foo = (a = await) => __awaiter(function* () {
    }, this, void 0, Promise);
}, this, void 0, Promise);
