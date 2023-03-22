// repro from #52439

// @strict: true

//@ts-ignore
let foo;
if (Math.random() > 0.5) {
  foo = "hello";
}
// bar: string | undefined
let bar = foo;

// baz: string
let baz = foo!;
