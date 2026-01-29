//// [tests/cases/compiler/declarationEmitParameterProperty.ts] ////

//// [declarationEmitParameterProperty.ts]
export class Foo {
  constructor(public bar?: string) {
  }
}


//// [declarationEmitParameterProperty.js]
export class Foo {
    constructor(bar) {
        this.bar = bar;
    }
}


//// [declarationEmitParameterProperty.d.ts]
export declare class Foo {
    bar?: string | undefined;
    constructor(bar?: string | undefined);
}
