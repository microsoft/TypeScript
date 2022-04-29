/// <reference path='fourslash.ts'/>

////export function f() {}
////[|1|];

const ranges = test.ranges();
const symbolsInScope = test.symbolsInScope(ranges[0]);
const f = symbolsInScope.find(s => s.name === "f");
if (f === undefined) throw new Error("'f' not in scope");
if (f.exportSymbol === undefined) throw new Error("Expected to get the local symbol");

verify.typeOfSymbolAtLocation(ranges[0], f, "() => void");
