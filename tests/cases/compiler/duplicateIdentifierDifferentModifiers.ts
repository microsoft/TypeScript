// @target: es2015
// @strict: false
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
