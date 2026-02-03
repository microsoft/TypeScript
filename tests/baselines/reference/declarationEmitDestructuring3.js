//// [tests/cases/compiler/declarationEmitDestructuring3.ts] ////

//// [declarationEmitDestructuring3.ts]
function bar([x, z, ...w]) { }
function foo([x, ...y] = [1, "string", true]) { }



//// [declarationEmitDestructuring3.js]
function bar([x, z, ...w]) { }
function foo([x, ...y] = [1, "string", true]) { }


//// [declarationEmitDestructuring3.d.ts]
declare function bar([x, z, ...w]: [any, any, ...any[]]): void;
declare function foo([x, ...y]?: [number, string, boolean]): void;
