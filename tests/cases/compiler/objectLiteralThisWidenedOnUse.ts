// @noImplicitThis: true
interface Foo { bar: boolean; }

var GlobalIns = {
  prop1: 1,
  prop2: 2,
  prop3: 3,
  test () {
    this.accept_foo(this);
  },
  accept_foo (foo: Foo): boolean {
    return !!foo && !!foo.bar;
  }
};