//// [tests/cases/conformance/declarationEmit/declarationEmitWorkWithInlineComments.ts] ////

//// [declarationEmitWorkWithInlineComments.ts]
export class Foo {
  constructor(
    /** @internal */
    public isInternal1: string,
    /** @internal */ public isInternal2: string, /** @internal */
    public isInternal3: string,
    // @internal
    public isInternal4: string,
    // nothing
    /** @internal */
    public isInternal5: string,
    /* @internal */ public isInternal6: string /* trailing */,
    /* @internal */ public isInternal7: string, /** @internal */
    // not work
    public notInternal1: string,
    // @internal
    /* not work */
    public notInternal2: string,
    /* not work */
    // @internal
    /* not work */
    public notInternal3: string,
  ) { }
}

export class Bar {
  constructor(/* @internal */ public isInternal1: string) {}
}

export class Baz {
  constructor(/* @internal */
    public isInternal: string
  ) {}
}

//// [declarationEmitWorkWithInlineComments.js]
export class Foo {
    isInternal1;
    isInternal2;
    isInternal3;
    isInternal4;
    isInternal5;
    isInternal6;
    isInternal7;
    notInternal1;
    notInternal2;
    notInternal3;
    constructor(
    /** @internal */
    isInternal1, 
    /** @internal */ isInternal2, /** @internal */ isInternal3, 
    // @internal
    isInternal4, 
    // nothing
    /** @internal */
    isInternal5, 
    /* @internal */ isInternal6 /* trailing */, 
    /* @internal */ isInternal7, /** @internal */ 
    // not work
    notInternal1, 
    // @internal
    /* not work */
    notInternal2, 
    /* not work */
    // @internal
    /* not work */
    notInternal3) {
        this.isInternal1 = isInternal1;
        this.isInternal2 = isInternal2;
        this.isInternal3 = isInternal3;
        this.isInternal4 = isInternal4;
        this.isInternal5 = isInternal5;
        this.isInternal6 = isInternal6;
        this.isInternal7 = isInternal7;
        this.notInternal1 = notInternal1;
        this.notInternal2 = notInternal2;
        this.notInternal3 = notInternal3;
    }
}
export class Bar {
    isInternal1;
    constructor(/* @internal */ isInternal1) {
        this.isInternal1 = isInternal1;
    }
}
export class Baz {
    isInternal;
    constructor(/* @internal */ isInternal) {
        this.isInternal = isInternal;
    }
}


//// [declarationEmitWorkWithInlineComments.d.ts]
export declare class Foo {
    notInternal1: string;
    notInternal2: string;
    notInternal3: string;
    constructor(
    /** @internal */
    isInternal1: string, 
    /** @internal */ isInternal2: string, /** @internal */ isInternal3: string, isInternal4: string, 
    /** @internal */
    isInternal5: string, isInternal6: string, isInternal7: string, /** @internal */ notInternal1: string, notInternal2: string, notInternal3: string);
}
export declare class Bar {
    constructor(/* @internal */ isInternal1: string);
}
export declare class Baz {
    constructor(/* @internal */ isInternal: string);
}
