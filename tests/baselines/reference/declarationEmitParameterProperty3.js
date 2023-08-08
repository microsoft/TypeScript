//// [declarationEmitParameterProperty3.ts]
class C {
  constructor(public a = 123, b: string) {}
}

//// [declarationEmitParameterProperty3.js]
var C = /** @class */ (function () {
    function C(a, b) {
        if (a === void 0) { a = 123; }
        this.a = a;
    }
    return C;
}());


//// [declarationEmitParameterProperty3.d.ts]
declare class C {
    a: number;
    constructor(a: number | undefined, b: string);
}
