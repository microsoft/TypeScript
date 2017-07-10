//// [declarationEmitParameterProperty.ts]
export class Foo {
  constructor(public bar?: string) {
  }
}


//// [declarationEmitParameterProperty.js]
"use strict";
exports.__esModule = true;
var Foo = (function () {
    function Foo(bar) {
        this.bar = bar;
    }
    return Foo;
}());
exports.Foo = Foo;


//// [declarationEmitParameterProperty.d.ts]
export declare class Foo {
    bar: string | undefined;
    constructor(bar?: string | undefined);
}
