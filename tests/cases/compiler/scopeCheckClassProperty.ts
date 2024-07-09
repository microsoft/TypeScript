class C {
  constructor() {
    new A().p; // ok
  }
  public x = new A().p; // should also be ok
}
class A {
  public p = '';
}
