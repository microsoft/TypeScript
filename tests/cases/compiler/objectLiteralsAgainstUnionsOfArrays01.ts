interface Foo {
  bar: Bar | Bar[];
}

interface Bar {
  prop: string;
}

let x: Foo[] = [
  { bar: { prop: 100 } }
]
