//// [tests/cases/compiler/declarationEmitEnumReadonlyProperty.ts] ////

//// [declarationEmitEnumReadonlyProperty.ts]
enum E {
    A = 'a',
    B = 'b'
}

class C {
    readonly type = E.A;
}

let x: E.A = new C().type;

//// [declarationEmitEnumReadonlyProperty.js]
"use strict";
var E;
(function (E) {
    E["A"] = "a";
    E["B"] = "b";
})(E || (E = {}));
class C {
    type = E.A;
}
let x = new C().type;


//// [declarationEmitEnumReadonlyProperty.d.ts]
declare enum E {
    A = "a",
    B = "b"
}
declare class C {
    readonly type = E.A;
}
declare let x: E.A;
