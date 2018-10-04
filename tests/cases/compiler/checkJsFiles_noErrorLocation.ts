// @allowJs: true
// @checkJs: true
// @noEmit: true

// @fileName: a.js
// @ts-check
class A {
  constructor() {

  }
  foo() {
    return 4;
  }
}

class B extends A {
  constructor() {
    super();
    this.foo = () => 3;
  }
}

const i = new B();
i.foo();