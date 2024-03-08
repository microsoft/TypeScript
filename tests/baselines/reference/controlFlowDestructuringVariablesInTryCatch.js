//// [tests/cases/compiler/controlFlowDestructuringVariablesInTryCatch.ts] ////

//// [controlFlowDestructuringVariablesInTryCatch.ts]
declare function f1(): string;
declare function f2(): [b: string];
declare function f3(): { c: string };

try {
    var a = f1();
    var [b] = f2();
    var { c } = f3();

    var [d = 1] = [];
    var { e = 1 } = { };
} catch {
    console.error("error");
}

a;
b;
c;
d;
e;


//// [controlFlowDestructuringVariablesInTryCatch.js]
"use strict";
try {
    var a = f1();
    var b = f2()[0];
    var c = f3().c;
    var _a = [][0], d = _a === void 0 ? 1 : _a;
    var _b = {}.e, e = _b === void 0 ? 1 : _b;
}
catch (_c) {
    console.error("error");
}
a;
b;
c;
d;
e;
