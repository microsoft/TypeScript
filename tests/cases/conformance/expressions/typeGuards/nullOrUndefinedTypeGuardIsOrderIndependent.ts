// @strictNullChecks: true
function test(strOrNull: string | null, strOrUndefined: string | undefined) {
    var str: string = "original";
    var nil: null;
    if (null === strOrNull) {
        nil = strOrNull;
    }
    else {
        str = strOrNull;
    }
    if (undefined !== strOrUndefined) {
        str = strOrUndefined;
    }
}
