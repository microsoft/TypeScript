//// [tests/cases/compiler/declarationEmitParameterProperty.ts] ////

//// [declarationEmitParameterProperty.ts]
export class Foo {
  constructor(public bar?: string) {
  }
}


//// [declarationEmitParameterProperty.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo(bar) {
        this.bar = bar;
    }
    return Foo;
}());
exports.Foo = Foo;


//// [declarationEmitParameterProperty.d.ts]
export declare class Foo {
    bar?: string | undefined;
    constructor(bar?: string | undefined);
}
