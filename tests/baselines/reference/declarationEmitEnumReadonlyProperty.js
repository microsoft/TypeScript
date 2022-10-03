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
var E;
(function (E) {
    E["A"] = "a";
    E["B"] = "b";
})(E || (E = {}));
var C = /** @class */ (function () {
    function C() {
        this.type = E.A;
    }
    return C;
}());
var x = new C().type;


//// [declarationEmitEnumReadonlyProperty.d.ts]
declare enum E {
    A = "a",
    B = "b"
}
declare class C {
    readonly type = E.A;
}
declare let x: E.A;
