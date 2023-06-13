//// [tests/cases/conformance/expressions/typeGuards/nullOrUndefinedTypeGuardIsOrderIndependent.ts] ////

//// [nullOrUndefinedTypeGuardIsOrderIndependent.ts]
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


//// [nullOrUndefinedTypeGuardIsOrderIndependent.js]
function test(strOrNull, strOrUndefined) {
    var str = "original";
    var nil;
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
