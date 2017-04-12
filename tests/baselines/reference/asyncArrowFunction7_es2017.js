//// [asyncArrowFunction7_es2017.ts]
var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}

//// [asyncArrowFunction7_es2017.js]
var bar = async () => {
    // 'await' here is an identifier, and not an await expression.
    var foo = async (a = await ) => {
    };
};
