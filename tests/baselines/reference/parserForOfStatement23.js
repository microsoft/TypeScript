//// [tests/cases/conformance/parser/ecmascript6/Iterators/parserForOfStatement23.ts] ////

//// [parserForOfStatement23.ts]
async function foo(x: any) {
    var async;
    for await (async of x) {}
}


//// [parserForOfStatement23.js]
async function foo(x) {
    var async;
    for await (async of x) { }
}
