//// [typeGuardBoolean.ts]
function test(strOrNull: string | null, strOrUndefined: string | undefined) {
  var str: string = "original";
  var nil: null;
  if (!Boolean(strOrNull)) {
      nil = strOrNull;
  }
  else {
      str = strOrNull;
  }
  if (Boolean(strOrUndefined)) {
      str = strOrUndefined;
  }
}


//// [typeGuardBoolean.js]
function test(strOrNull, strOrUndefined) {
    var str = "original";
    var nil;
    if (!Boolean(strOrNull)) {
        nil = strOrNull;
    }
    else {
        str = strOrNull;
    }
    if (Boolean(strOrUndefined)) {
        str = strOrUndefined;
    }
}
