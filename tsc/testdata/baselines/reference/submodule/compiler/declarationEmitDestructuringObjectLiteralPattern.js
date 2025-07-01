//// [tests/cases/compiler/declarationEmitDestructuringObjectLiteralPattern.ts] ////

//// [declarationEmitDestructuringObjectLiteralPattern.ts]
var { } = { x: 5, y: "hello" };
var { x4 } = { x4: 5, y4: "hello" };
var { y5 } = { x5: 5, y5: "hello" };
var { x6, y6 } = { x6: 5, y6: "hello" };
var { x7: a1 } = { x7: 5, y7: "hello" };
var { y8: b1 } = { x8: 5, y8: "hello" };
var { x9: a2, y9: b2 } = { x9: 5, y9: "hello" };

var { a: x11, b: { a: y11, b: { a: z11 }}} = { a: 1, b: { a: "hello", b: { a: true } } };

function f15() {
    var a4 = "hello";
    var b4 = 1;
    var c4 = true;
    return { a4, b4, c4 };
}
var { a4, b4, c4 } = f15();

module m {
    export var { a4, b4, c4 } = f15();
}

//// [declarationEmitDestructuringObjectLiteralPattern.js]
var {} = { x: 5, y: "hello" };
var { x4 } = { x4: 5, y4: "hello" };
var { y5 } = { x5: 5, y5: "hello" };
var { x6, y6 } = { x6: 5, y6: "hello" };
var { x7: a1 } = { x7: 5, y7: "hello" };
var { y8: b1 } = { x8: 5, y8: "hello" };
var { x9: a2, y9: b2 } = { x9: 5, y9: "hello" };
var { a: x11, b: { a: y11, b: { a: z11 } } } = { a: 1, b: { a: "hello", b: { a: true } } };
function f15() {
    var a4 = "hello";
    var b4 = 1;
    var c4 = true;
    return { a4, b4, c4 };
}
var { a4, b4, c4 } = f15();
var m;
(function (m) {
    ({ a4: m.a4, b4: m.b4, c4: m.c4 } = f15());
})(m || (m = {}));


//// [declarationEmitDestructuringObjectLiteralPattern.d.ts]
declare var x4: number;
declare var y5: string;
declare var x6: number, y6: string;
declare var a1: number;
declare var b1: string;
declare var a2: number, b2: string;
declare var x11: number, y11: string, z11: boolean;
declare function f15(): {
    a4: string;
    b4: number;
    c4: boolean;
};
declare var a4: string, b4: number, c4: boolean;
declare namespace m {
    var a4: string, b4: number, c4: boolean;
}
