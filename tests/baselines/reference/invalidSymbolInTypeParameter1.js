//// [tests/cases/compiler/invalidSymbolInTypeParameter1.ts] ////

//// [invalidSymbolInTypeParameter1.ts]
function test() {
    var cats = new Array<WAWA>(); // WAWA is not a valid type
}


//// [invalidSymbolInTypeParameter1.js]
function test() {
    var cats = new Array(); // WAWA is not a valid type
}
