//// [tests/cases/compiler/es6ModuleConstEnumDeclaration.ts] ////

//// [es6ModuleConstEnumDeclaration.ts]
export const enum e1 {
    a,
    b,
    c
}
const enum e2 {
    x,
    y,
    z
}
var x = e1.a;
var y = e2.x;
export namespace m1 {
    export const enum e3 {
        a,
        b,
        c
    }
    const enum e4 {
        x,
        y,
        z
    }
    var x1 = e1.a;
    var y1 = e2.x;
    var x2 = e3.a;
    var y2 = e4.x;
}
namespace m2 {
    export const enum e5 {
        a,
        b,
        c
    }
    const enum e6 {
        x,
        y,
        z
    }
    var x1 = e1.a;
    var y1 = e2.x;
    var x2 = e5.a;
    var y2 = e6.x;
    var x3 = m1.e3.a;
}

//// [es6ModuleConstEnumDeclaration.js]
var x = 0 /* e1.a */;
var y = 0 /* e2.x */;
export var m1;
(function (m1) {
    var x1 = 0 /* e1.a */;
    var y1 = 0 /* e2.x */;
    var x2 = 0 /* e3.a */;
    var y2 = 0 /* e4.x */;
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    var x1 = 0 /* e1.a */;
    var y1 = 0 /* e2.x */;
    var x2 = 0 /* e5.a */;
    var y2 = 0 /* e6.x */;
    var x3 = 0 /* m1.e3.a */;
})(m2 || (m2 = {}));
