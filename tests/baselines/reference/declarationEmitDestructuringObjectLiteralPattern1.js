//// [tests/cases/compiler/declarationEmitDestructuringObjectLiteralPattern1.ts] ////

//// [declarationEmitDestructuringObjectLiteralPattern1.ts]
var { } = { x: 5, y: "hello" };
var { x4 } = { x4: 5, y4: "hello" };
var { y5 } = { x5: 5, y5: "hello" };
var { x6, y6 } = { x6: 5, y6: "hello" };
var { x7: a1 } = { x7: 5, y7: "hello" };
var { y8: b1 } = { x8: 5, y8: "hello" };
var { x9: a2, y9: b2 } = { x9: 5, y9: "hello" };

//// [declarationEmitDestructuringObjectLiteralPattern1.js]
var {} = { x: 5, y: "hello" };
var { x4 } = { x4: 5, y4: "hello" };
var { y5 } = { x5: 5, y5: "hello" };
var { x6, y6 } = { x6: 5, y6: "hello" };
var { x7: a1 } = { x7: 5, y7: "hello" };
var { y8: b1 } = { x8: 5, y8: "hello" };
var { x9: a2, y9: b2 } = { x9: 5, y9: "hello" };


//// [declarationEmitDestructuringObjectLiteralPattern1.d.ts]
declare var x4: number;
declare var y5: string;
declare var x6: number, y6: string;
declare var a1: number;
declare var b1: string;
declare var a2: number, b2: string;
