// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62247

const isBar = Symbol("isBar");

abstract class Foo {
  abstract [isBar](): this is Bar;

  method(): void {
    if (this[isBar]()) {
      this.barMethod(); // ok
    }
  }
}

class Bar extends Foo {
  override [isBar](): this is Bar {
    return true;
  }

  barMethod(): void {}
}
