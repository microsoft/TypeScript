// @strictNullChecks: true
type foo = {
  bar: number | null;
  baz: string;
  nested: {
    a: number;
    b: string | null;
  }
};

const aFoo: foo = { bar: 3, baz: "b", nested: { a: 1, b: "y" } };

if (aFoo.bar && aFoo.nested.b) {
  const { bar, baz, nested: {a, b: text} } = aFoo;
  const right: number = aFoo.bar;
  const wrong: number = bar;
  const another: string = baz;
  const aAgain: number = a;
  const bAgain: string = text;
}

type bar = {
  elem1: number | null;
  elem2: foo | null;
};

const bBar = { elem1: 7, elem2: aFoo };

if (bBar.elem2 && bBar.elem2.bar && bBar.elem2.nested.b) {
  const { bar, baz, nested: {a, b: text} } = bBar.elem2;
  const right: number = bBar.elem2.bar;
  const wrong: number = bar;
  const another: string = baz;
  const aAgain: number = a;
  const bAgain: string = text;
}
