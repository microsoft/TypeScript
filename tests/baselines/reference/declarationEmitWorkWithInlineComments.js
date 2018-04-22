//// [declarationEmitWorkWithInlineComments.ts]
export class Foo {
  constructor(/** @internal */ public bar: string) { }  
  /** @internal */ zoo: string;
}


//// [declarationEmitWorkWithInlineComments.js]
"use strict";
exports.__esModule = true;
var Foo = /** @class */ (function () {
    function Foo(/** @internal */ bar) {
        this.bar = bar;
    }
    return Foo;
}());
exports.Foo = Foo;


//// [declarationEmitWorkWithInlineComments.d.ts]
export declare class Foo {
    constructor(/** @internal */ bar: string);
}
