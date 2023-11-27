//// [tests/cases/compiler/declarationEmitParameterProperty.ts] ////

//// [declarationEmitParameterProperty.ts]
export class Foo {
  constructor(public bar?: string) {
  }
}


/// [Declarations] ////



//// [declarationEmitParameterProperty.d.ts]
export declare class Foo {
    bar?: string;
    constructor(bar?: string);
}
//# sourceMappingURL=declarationEmitParameterProperty.d.ts.map