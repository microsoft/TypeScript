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
var _a = { a: 1, b: { a: "hello", b: { a: true } } }, x11 = _a.a, _b = _a.b, y11 = _b.a, z11 = _b.b.a;
function f15() {
    var a4 = "hello";
    var b4 = 1;
    var c4 = true;
    return { a4: a4, b4: b4, c4: c4 };
}
var _c = f15(), a4 = _c.a4, b4 = _c.b4, c4 = _c.c4;
var m;
(function (m) {
    var _a;
    _a = f15(), m.a4 = _a.a4, m.b4 = _a.b4, m.c4 = _a.c4;
})(m || (m = {}));


//// [declarationEmitDestructuringObjectLiteralPattern2.d.ts]
declare var x11: number, y11: string, z11: boolean;
declare function f15(): {
    a4: string;
    b4: number;
    c4: boolean;
};
declare var a4: string, b4: number, c4: boolean;
declare module m {
    var a4: string, b4: number, c4: boolean;
}
