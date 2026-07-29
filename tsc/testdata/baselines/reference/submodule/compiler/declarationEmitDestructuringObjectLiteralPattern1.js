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
"use strict";
var {} = { x: 5, y: "hello" };
var { x4 } = { x4: 5, y4: "hello" };
var { y5 } = { x5: 5, y5: "hello" };
var { x6, y6 } = { x6: 5, y6: "hello" };
var { x7: a1 } = { x7: 5, y7: "hello" };
var { y8: b1 } = { x8: 5, y8: "hello" };
var { x9: a2, y9: b2 } = { x9: 5, y9: "hello" };


//// [declarationEmitDestructuringObjectLiteralPattern1.d.ts]
declare var { x4 }: {
    x4: number;
    y4: string;
};
declare var { y5 }: {
    x5: number;
    y5: string;
};
declare var { x6, y6 }: {
    x6: number;
    y6: string;
};
declare var { x7: a1 }: {
    x7: number;
    y7: string;
};
declare var { y8: b1 }: {
    x8: number;
    y8: string;
};
declare var { x9: a2, y9: b2 }: {
    x9: number;
    y9: string;
};
