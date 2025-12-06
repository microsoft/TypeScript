// @strict: true
// @target: es5, esnext
// @exactOptionalPropertyTypes: true, false
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/54302

type Item = {
  value: string;
};

type Foo = [Item?];
declare const foo: Foo;
for (let item of foo) {
  item.value;
}

type Foo2 = [item?: Item];
declare const foo2: Foo2;
for (let item of foo2) {
  item.value;
}

function fn1(t: [number, number?, number?]) {
  for (let num of t) {
    num.toString()
  }
}

function fn2(t: [a: number, b?: number, c?: number]) {
  for (let num of t) {
    num.toString()
  }
}
