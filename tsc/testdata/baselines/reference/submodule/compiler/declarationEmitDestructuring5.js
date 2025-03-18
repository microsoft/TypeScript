//// [tests/cases/compiler/declarationEmitDestructuring5.ts] ////

//// [declarationEmitDestructuring5.ts]
function baz([, z, , ]) { }
function foo([, b, ]: [any, any]): void { }
function bar([z, , , ]) { }
function bar1([z, , , ] = [1, 3, 4, 6, 7]) { }
function bar2([,,z, , , ]) { }

//// [declarationEmitDestructuring5.js]
function baz([, z, ,]) { }
function foo([, b,]) { }
function bar([z, , ,]) { }
function bar1([z, , ,] = [1, 3, 4, 6, 7]) { }
function bar2([, , z, , ,]) { }
