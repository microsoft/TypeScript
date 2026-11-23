//// [tests/cases/compiler/incompatibleAssignmentInEnumComputedNameNoFlake.ts] ////

//// [incompatibleAssignmentInEnumComputedNameNoFlake.ts]
// TS2322: Type 'string' is not assignable to type 'number'.
let target: number;
enum E {
    [(() => {
        const text = (target = "value");
        return text.length;
    })()]
}

//// [incompatibleAssignmentInEnumComputedNameNoFlake.js]
"use strict";
// TS2322: Type 'string' is not assignable to type 'number'.
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


//// [incompatibleAssignmentInEnumComputedNameNoFlake.d.ts]
declare let target: number;
declare enum E {
    [(() => {
        const text = (target = "value");
        return text.length;
    })()] = 0
}
