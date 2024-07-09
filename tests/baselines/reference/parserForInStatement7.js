//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForInStatement7.ts] ////

//// [parserForInStatement7.ts]
for (var a: number = 1, b: string = "" in X) {
}

//// [parserForInStatement7.js]
for (var a = 1, b = "" in X) {
}
