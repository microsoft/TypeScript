//// [tests/cases/conformance/generators/restParameterInDownlevelGenerator.ts] ////

//// [restParameterInDownlevelGenerator.ts]
// https://github.com/Microsoft/TypeScript/issues/30653
function * mergeStringLists(...strings: string[]) {
    for (var str of strings);
}

//// [restParameterInDownlevelGenerator.js]
function* mergeStringLists(...strings) {
    for (var str of strings)
        ;
}
