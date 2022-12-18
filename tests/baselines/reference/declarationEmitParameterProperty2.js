//// [declarationEmitParameterProperty2.ts]
class C {
  constructor(public a = 123, b: string) {}
}

//// [declarationEmitParameterProperty2.js]
var C = /** @class */ (function () {
    function C(a, b) {
        if (a === void 0) { a = 123; }
        this.a = a;
    }
    return C;
}());


//// [declarationEmitParameterProperty2.d.ts]
declare class C {
    a: number;
    constructor(a: number | undefined, b: string);
}
