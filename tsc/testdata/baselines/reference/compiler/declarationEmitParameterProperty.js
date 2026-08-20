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
    constructor(bar) {
        this.bar = bar;
    }
}
exports.Foo = Foo;


//// [declarationEmitParameterProperty.d.ts]
export declare class Foo {
    bar?: string | undefined;
    constructor(bar?: string | undefined);
}
