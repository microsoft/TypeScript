// @declaration: true
// @stripInternal:true
export class Foo {
  constructor(/** @internal */ public bar: string) { }  
  /** @internal */ zoo: string;
}
