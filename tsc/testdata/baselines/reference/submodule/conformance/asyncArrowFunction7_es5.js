//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction7_es5.ts] ////

//// [asyncArrowFunction7_es5.ts]
var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}

//// [asyncArrowFunction7_es5.js]
var bar = async () => {
    // 'await' here is an identifier, and not an await expression.
    var foo = async (a = await ) => {
    };
};
