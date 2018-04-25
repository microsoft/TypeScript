// @declaration: true
// @stripInternal:true

export class Foo {
  constructor(
    /** @internal */
    public isInternal1: string,
    /** @internal */ public isInternal2: string, /** @internal */
    public isInternal3: string,
    // @internal
    public isInternal4: string,
    // @internal
    /** @internal */
    public isInternal5: string,
    /* @internal */ public isInternal6: string, /** @internal */
    // next line
    public notInternal1: string,
    // @internal
    /* next line */
    public notInternal2: string
  ) { }
}
