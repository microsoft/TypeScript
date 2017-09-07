//// [destructuringTypeGuardFlow.ts]
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


//// [destructuringTypeGuardFlow.js]
var aFoo = { bar: 3, baz: "b", nested: { a: 1, b: "y" } };
if (aFoo.bar && aFoo.nested.b) {
    var bar = aFoo.bar, baz = aFoo.baz, _a = aFoo.nested, a = _a.a, text = _a.b;
    var right = aFoo.bar;
    var wrong = bar;
    var another = baz;
    var aAgain = a;
    var bAgain = text;
}
var bBar = { elem1: 7, elem2: aFoo };
if (bBar.elem2 && bBar.elem2.bar && bBar.elem2.nested.b) {
    var _b = bBar.elem2, bar = _b.bar, baz = _b.baz, _c = _b.nested, a = _c.a, text = _c.b;
    var right = bBar.elem2.bar;
    var wrong = bar;
    var another = baz;
    var aAgain = a;
    var bAgain = text;
}
