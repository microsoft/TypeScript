//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction8_es5.ts] ////

//// [asyncArrowFunction8_es5.ts]
var foo = async (): Promise<void> => {
  var v = { [await]: foo }
}

//// [asyncArrowFunction8_es5.js]
var foo = async () => {
    var v = { [await ]: foo };
};
