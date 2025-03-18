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
class Foo {
    bar;
    constructor(bar) {
        this.bar = bar;
    }
}
exports.Foo = Foo;
