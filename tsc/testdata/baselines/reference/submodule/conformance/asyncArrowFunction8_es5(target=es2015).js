//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction8_es5.ts] ////

//// [asyncArrowFunction8_es5.ts]
var foo = async (): Promise<void> => {
  var v = { [await]: foo }
}

//// [asyncArrowFunction8_es5.js]
"use strict";
var foo = async () => {
    var v = { [await ]: foo };
};
