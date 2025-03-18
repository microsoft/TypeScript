//// [tests/cases/compiler/methodSignatureDeclarationEmit1.ts] ////

//// [methodSignatureDeclarationEmit1.ts]
class C {
  public foo(n: number): void;
  public foo(s: string): void;
  public foo(a: any): void {
  }
}

//// [methodSignatureDeclarationEmit1.js]
class C {
    foo(a) {
    }
}
