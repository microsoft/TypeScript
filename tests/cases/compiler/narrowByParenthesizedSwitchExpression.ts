// @strict: true
// @noEmit: true

interface Base {
  type: "foo" | "bar";
}

interface Foo extends Base {
  type: "foo";
  foo: string;
}

interface Bar extends Base {
  type: "bar";
  bar: number;
}

function getV(): Foo | Bar {
  return null!;
}

const v = getV();

switch ((v.type)) {
  case "bar":
    v.bar;
    break;

  case "foo":
    v.foo;
    break;
}
