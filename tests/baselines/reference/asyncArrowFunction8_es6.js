//// [tests/cases/conformance/async/es6/asyncArrowFunction/asyncArrowFunction8_es6.ts] ////

//// [asyncArrowFunction8_es6.ts]
var foo = async (): Promise<void> => {
  var v = { [await]: foo }
}

//// [asyncArrowFunction8_es6.js]
var foo = () => __awaiter(this, void 0, void 0, function* () {
    var v = { [yield ]: foo };
});
