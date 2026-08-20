// @strict: true
// @checkJs: true
// @target: esnext
// @noEmit: true

// @filename: index.js

class C {
  constructor() {
    this.foo = () => {
      console.log("called arrow");
    };
  }
  foo() {
    console.log("called method");
  }
}

class D extends C {
  foo() {
    console.log("SUPER:");
    super.foo();
    console.log("THIS:");
    this.foo();
  }
}

const obj = new D();
obj.foo();
D.prototype.foo.call(obj);
