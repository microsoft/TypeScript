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


//// [declarationEmitDestructuring5.d.ts]
declare function baz([, z, ]: [any, any, any?]): void;
declare function foo([, b]: [any, any]): void;
declare function bar([z, , ]: [any, any?, any?]): void;
declare function bar1([z, , ]?: [number, number, number, number, number]): void;
declare function bar2([, , z, , ]: [any, any, any, any?, any?]): void;
