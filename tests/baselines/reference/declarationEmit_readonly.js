//// [declarationEmit_readonly.ts]

class C {
    constructor(readonly x: number) {}
}

//// [declarationEmit_readonly.js]
var C = (function () {
    function C(x) {
        this.x = x;
    }
    return C;
}());


//// [declarationEmit_readonly.d.ts]
declare class C {
    readonly x: number;
    constructor(x: number);
}
