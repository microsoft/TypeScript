//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncArrowFunction7_es6.ts] ////

//// [asyncArrowFunction7_es6.ts]
var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}

//// [asyncArrowFunction7_es6.js]
var bar = async () => {
    // 'await' here is an identifier, and not an await expression.
    var foo = async (a = await ) => {
    };
};
