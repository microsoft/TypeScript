// @strict: true
// @noEmit: true

interface EmptyInterface {}
interface EmptyInterface2 {}

interface Foo {
  a: string;
}
interface Bar {
  b: string;
}

const m1: Partial<Foo> & ThisType<{ x: string }> = () => null; // error
const m2: Partial<Foo> = () => null; // error
const m3: Partial<Foo> & EmptyInterface = () => null; // error
const m4: EmptyInterface & EmptyInterface2 = () => null; // ok
const m5: Partial<Foo> & Partial<Bar> = () => null; // error

// https://github.com/microsoft/TypeScript/issues/56995
declare function fun0(arg: () => Foo & ThisType<Foo>): void;
declare function fun0(arg: Partial<Foo> & ThisType<Foo>): void;

fun0({ a: "1" }); // ok
fun0(() => ({ a: "1" })); // ok
fun0(() => ({ a: 1 })); // error