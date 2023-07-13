//// [tests/cases/conformance/parser/ecmascript5/parserUnicode1.ts] ////

//// [parserUnicode1.ts]
try {
  var \u0078x = 6;

  if (xx !== 6) {

    $ERROR('#6.1: var \\u0078x = 1; xx === 6. Actual: ' + (xx));
  }
}
catch (e) {
    $ERROR('#6.2: var \\u0078x = 1; xx === 6. Actual: ' + (xx));

}

//// [parserUnicode1.js]
try {
    var \u0078x = 6;
    if (xx !== 6) {
        $ERROR('#6.1: var \\u0078x = 1; xx === 6. Actual: ' + (xx));
    }
}
catch (e) {
    $ERROR('#6.2: var \\u0078x = 1; xx === 6. Actual: ' + (xx));
}
