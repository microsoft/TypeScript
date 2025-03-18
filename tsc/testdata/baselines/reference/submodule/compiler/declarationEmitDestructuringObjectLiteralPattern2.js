//// [tests/cases/compiler/declarationEmitDestructuringObjectLiteralPattern2.ts] ////

//// [declarationEmitDestructuringObjectLiteralPattern2.ts]
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

//// [declarationEmitDestructuringObjectLiteralPattern2.js]
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
