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
