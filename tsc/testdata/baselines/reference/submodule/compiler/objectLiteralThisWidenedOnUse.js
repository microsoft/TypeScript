//// [tests/cases/compiler/objectLiteralThisWidenedOnUse.ts] ////

//// [objectLiteralThisWidenedOnUse.ts]
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

//// [objectLiteralThisWidenedOnUse.js]
var GlobalIns = {
    prop1: 1,
    prop2: 2,
    prop3: 3,
    test() {
        this.accept_foo(this);
    },
    accept_foo(foo) {
        return !!foo && !!foo.bar;
    }
};
