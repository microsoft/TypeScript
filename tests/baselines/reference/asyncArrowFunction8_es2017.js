//// [asyncArrowFunction8_es2017.ts]
var foo = async (): Promise<void> => {
  var v = { [await]: foo }
}

//// [asyncArrowFunction8_es2017.js]
var foo = async () => {
    var v = { [await ]: foo };
};
