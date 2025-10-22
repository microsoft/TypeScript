// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59989

export class Foo {
  protected thisIsProtected = 1;
  private thisIsPrivate = 1;

  bar(): Foo {
    const that = this;

    return new (class extends Foo {
      something() {
        return that.thisIsPrivate + that.thisIsProtected; // ok
      }
    })();
  }
}

export class Foo2 {
  protected thisIsProtected = 1;
  private thisIsPrivate = 1;

  bar() {
    const that = this;

    return new (class {
      something() {
        return that.thisIsPrivate + that.thisIsProtected; // ok
      }
    })();
  }
}
