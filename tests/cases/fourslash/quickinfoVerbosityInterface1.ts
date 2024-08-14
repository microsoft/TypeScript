/// <reference path='fourslash.ts'/>

// simple case
//// {
////     interface Foo {
////         a: "a" | "c";
////     }
////     const f/*f1*/: Foo = { a: "a" };
//// }
// extends
//// {
////     interface Bar {
////         b: "b" | "d";
////     }
////     interface Foo extends Bar {
////         a: "a" | "c";
////     }
////     const f/*f2*/: Foo = { a: "a", b: "b" };
//// }
// methods
//// {
////     type BarParam = "b" | "d";
////     interface Bar {
////         bar(b: BarParam): string;
////     }
////     type FooType = "a" | "c";
////     interface FooParam {
////         param: FooType;
////     }
////     interface Foo extends Bar {
////         a: FooType;
////         foo: (a: FooParam) => number;
////     }
////     const f/*f3*/: Foo = { a: "a", bar: () => "b", foo: () => 1 };
//// }
// type parameters
//// {
////     interface Bar<B> {
////         bar(b: B): string;
////     }
////     interface FooParam {
////         param: "a" | "c";
////     }
////     interface Foo extends Bar<FooParam> {
////         a: "a" | "c";
////         foo: (a: FooParam) => number;
////     }
////     const f/*f4*/: Foo = { a: "a", bar: () => "b", foo: () => 1 };
////     const b/*b1*/: Bar<number> = { bar: () => "" };
//// }
// alias + interface
//// {
////     interface Foo<A> {
////         a: A;
////     }
////     type Alias = Foo<string>;
////     const a/*a*/: Alias = { a: "a" };
//// }
// decl merging
//// {
////     interface Foo {
////         a: "a";
////     }
////     interface Foo {
////         b: "b";
////     }
////     const f/*f5*/: Foo = { a: "a", b: "b" };
//// }


verify.baselineQuickInfo({
    f1: [0, 1],
    f2: [0, 1],
    f3: [0, 1, 2, 3],
    f4: [0, 1, 2],
    b1: [0, 1],
    a: [0, 1, 2],
    f5: [0, 1],
});