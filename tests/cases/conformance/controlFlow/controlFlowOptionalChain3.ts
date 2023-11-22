// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56482

interface Foo {
  bar: boolean;
}

function test1(foo: Foo | undefined) {
  if (foo?.bar === false) {
    foo;
  }
  foo;
}

function test2(foo: Foo | undefined) {
  if (foo?.bar === false) {
    foo;
  } else {
    foo;
  }
}
