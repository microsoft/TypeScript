//// [stripInternalParameterProperty.ts]
export class C {
    constructor(/** @internal */ public foo, public bar) {}
}


//// [stripInternalParameterProperty.js]
"use strict";
exports.__esModule = true;
var C = /** @class */ (function () {
    function C(/** @internal */ foo, bar) {
        this.foo = foo;
        this.bar = bar;
    }
    return C;
}());
exports.C = C;


//// [stripInternalParameterProperty.d.ts]
export declare class C {
    bar: any;
    constructor(/** @internal */ foo: any, bar: any);
}
