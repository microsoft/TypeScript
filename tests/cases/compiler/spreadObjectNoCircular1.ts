// @strict: true
// @noEmit: true

type Box = {
  content?: Foo | Box;
};

declare const b: Box;

class Foo {
  get foo() {
    return {
      content: this as Foo | Box,
      ...b,
    };
  }
}
