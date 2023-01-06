//// [self-types-ryan.ts]
type CaseInsensitive<T extends string> =
  self extends string
    ? Lowercase<self> extends Lowercase<T>
        ? self
        : Never<[
          `Type '${Print<self>}' is not assignable to type 'CaseInsensitive<${Print<T>}>'`,
          `Type 'Lowercase<${Print<self>}>' is not assignable to 'Lowercase<${Print<T>}>'`,
          `Type '${Print<Lowercase<self>>}' is not assignable to '${Print<Lowercase<T>>}'`
        ]>
    : T

type Box<T> = { value: T };
type Fooish = CaseInsensitive<"Foo">;
const x1: CaseInsensitive<"Foo"> = "FOO";
const x2: Fooish = "FOO";
const x3: Box<CaseInsensitive<"Foo">> = { value: "FOO" };
const x4: Box<Fooish> = { value: "FOO" };

type HeaderNames = CaseInsensitive<"Set-Cookie" | "Accept">;
declare const setHeader: (key: HeaderNames, value: string) => void
setHeader("Set-Cookie", "test")
setHeader("Accept", "test2")
setHeader("sEt-cOoKiE", "stop writing headers like this but ok")
setHeader("Acept", "nah this has a typo")

type DistributeCaseInsensitive<T extends string> = T extends unknown ? CaseInsensitive<T> : never;
let m: DistributeCaseInsensitive<"A" | "B"> = "a"

type BarIfFoo<T> = 
  T extends "foo"
    ? CaseInsensitive<"bar">
    : never

declare const f:
  <T extends string>(x: T, y: BarIfFoo<T>) => void

f("foo", "BAR")
f("foo", "XYZ")

type AnyString1<T> = self extends string ? T : never;
function foo1<T extends string>(a: CaseInsensitive<T>) {
  let m: AnyString1<T> = a;
  let n: AnyString1<T> = {} as string;
}

type AnyString2 = self extends string ? self : never;
function foo2<T extends string>(a: CaseInsensitive<T>) {
  let m: AnyString2 = a; // TODO?: this should probably compile
  let n: AnyString2 = {} as string;
}

//// [self-types-ryan.js]
var x1 = "FOO";
var x2 = "FOO";
var x3 = { value: "FOO" };
var x4 = { value: "FOO" };
setHeader("Set-Cookie", "test");
setHeader("Accept", "test2");
setHeader("sEt-cOoKiE", "stop writing headers like this but ok");
setHeader("Acept", "nah this has a typo");
var m = "a";
f("foo", "BAR");
f("foo", "XYZ");
function foo1(a) {
    var m = a;
    var n = {};
}
function foo2(a) {
    var m = a; // TODO?: this should probably compile
    var n = {};
}
