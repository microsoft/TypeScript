//// [asyncArrowFunction7_es6.ts]

var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}

//// [asyncArrowFunction7_es6.js]
var bar = () => __awaiter(function *() {
    // 'await' here is an identifier, and not an await expression.
    var foo = (...arguments_1) => __awaiter(function *(a = yield ) {
    }.apply(this, arguments_1), Promise);
}.apply(this), Promise);
