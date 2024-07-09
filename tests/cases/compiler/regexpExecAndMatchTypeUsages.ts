// @strict: true,false
// @noUncheckedIndexedAccess: true
// @exactOptionalPropertyTypes: true
// @lib: es2018

export function foo(matchResult: RegExpMatchArray, execResult: RegExpExecArray) {
    matchResult[0].length;
    matchResult[999].length;
    matchResult.index + 0;
    matchResult.input.length;
    matchResult.groups["someVariable"].length;
    matchResult.groups = undefined;

    execResult[0].length;
    execResult[999].length;
    execResult.index + 0;
    execResult.input.length;
    execResult.groups["someVariable"].length;
    execResult.groups = undefined;

    if (Math.random()) {
        matchResult = execResult;
    }
    else {
        execResult = matchResult
    }
}
