//// [tests/cases/compiler/declarationEmitDestructuring1.ts] ////

//// [declarationEmitDestructuring1.ts]
function foo([a, b, c]: [string, string, string]): void { }
function far([a, [b], [[c]]]: [number, boolean[], string[][]]): void { }
function bar({a1, b1, c1}: { a1: number, b1: boolean, c1: string }): void { }
function baz({a2, b2: {b1, c1}}: { a2: number, b2: { b1: boolean, c1: string } }): void { } 


//// [declarationEmitDestructuring1.js]
function foo([a, b, c]) { }
function far([a, [b], [[c]]]) { }
function bar({ a1, b1, c1 }) { }
function baz({ a2, b2: { b1, c1 } }) { }
