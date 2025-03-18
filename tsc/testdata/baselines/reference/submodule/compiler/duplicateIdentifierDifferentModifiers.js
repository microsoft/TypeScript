//// [tests/cases/compiler/duplicateIdentifierDifferentModifiers.ts] ////

//// [duplicateIdentifierDifferentModifiers.ts]
// Not OK
interface B { x; }
interface B { x?; }

// OK
class A {
  public y: string;
}

interface A {
  y: string;
}

// Not OK
class C {
  private y: string;
}

interface C {
  y: string;
}


//// [duplicateIdentifierDifferentModifiers.js]
class A {
    y;
}
class C {
    y;
}
