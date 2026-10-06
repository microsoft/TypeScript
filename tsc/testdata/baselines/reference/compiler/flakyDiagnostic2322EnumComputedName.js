//// [tests/cases/compiler/flakyDiagnostic2322EnumComputedName.ts] ////

//// [flakyDiagnostic2322EnumComputedName.ts]
let target: number;
enum E {
    [(() => {
        const text = (target = "value");
        return text.length;
    })()]
}

//// [flakyDiagnostic2322EnumComputedName.js]
"use strict";
let target;
var E;
(function (E) {
    E[E[(() => {
        const text = (target = "value");
        return text.length;
    })()] = 0] = (() => {
        const text = (target = "value");
        return text.length;
    })();
})(E || (E = {}));


//// [flakyDiagnostic2322EnumComputedName.d.ts]
declare let target: number;
declare enum E {
    [(() => {
        const text = (target = "value");
        return text.length;
    })()] = 0
}
