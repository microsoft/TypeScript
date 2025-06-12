//// [tests/cases/conformance/parser/ecmascript5/Statements/parserES5ForOfStatement7.ts] ////

//// [parserES5ForOfStatement7.ts]
for (var a: number = 1, b: string = "" of X) {
}

//// [parserES5ForOfStatement7.js]
for (var a = 1, b = "" of X) {
}
