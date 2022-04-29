/// <reference path='fourslash.ts' />

// #34841

////interface IFoo {
////  bar(): void;
////}
////
////class Foo implements IFoo {
////  private x = 1;
////  constructor() { this.x = 2 }
////}

verify.codeFix({
  description: "Implement interface 'IFoo'",
  index: 0,
  newFileContent:
`interface IFoo {
  bar(): void;
}

class Foo implements IFoo {
  private x = 1;
  constructor() { this.x = 2 }
    bar(): void {
        throw new Error("Method not implemented.");
    }
}`});
